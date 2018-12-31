// Make environment variables defined in .env available on process.env
require('dotenv').config()

// Modules
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const config = require('./config.js')
const eyes = require('eyes')
const _ = require('lodash')
const { google } = require('googleapis')

// Templates
const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
const homePageTemplate = path.resolve('./src/templates/home.js')

// Analytics
const scopes = ['https://www.googleapis.com/auth/analytics.readonly']
const view_id = process.env.VIEW_ID
const jwt = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  _.replace(process.env.PRIVATE_KEY, /\\n/g, '\n'),
  scopes
)

async function getPageViews(startDate) {
  const response = await jwt.authorize()
  const results = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: 'ga:' + view_id,
    metrics: 'ga:uniquePageviews',
    dimensions: 'ga:pagePath',
    'start-date': startDate,
    'end-date': 'yesterday',
    sort: '-ga:uniquePageviews',
    'max-results': 10
  })
  return results.data.rows
}

function removeNonPostPagesFromAnalytics(el) {
  let relUrl = el[0]
  let parts = relUrl.split('/')
  if (relUrl === '/' || relUrl === '/abcxyz' || relUrl === '/abc') {
    return false
  }
  if (parts[1] === 'tags') {
    return false
  }
  if (Number(parts[1])) {
    return false
  }
  return true
}

const createPostPages = (createPage, posts, pageViews) => {
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
        pageViews
      }
    })
  })
}

const createTagPages = (createPage, posts, pageViews) => {
  const tagTemplate = path.resolve(`src/templates/tag.js`)
  const tagIndexTemplate = path.resolve(`src/templates/tag-index.js`)
  const postsByTags = {}
  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = []
        }
        postsByTags[tag].push(node)
      })
    }
  })
  const tags = Object.keys(postsByTags)
  createPage({
    path: `/tags/`,
    component: tagIndexTemplate,
    context: {
      tags: tags.sort(),
      pageViews
    }
  })
  tags.forEach(tagName => {
    const posts = postsByTags[tagName]
    createPage({
      path: `/tags/${tagName}/`,
      component: tagTemplate,
      context: {
        posts,
        tagName,
        pageViews
      }
    })
  })
}

const createHomePages = (createPage, posts) => {
  const postsPerPage = config.postsPerPage
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}/`,
      component: homePageTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        pageViews
      }
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            html
            id
            headings {
              value
              depth
            }
            tableOfContents(pathToSlugField: "frontmatter.path")
            frontmatter {
              date
              path
              title
              excerpt
              tags
              draft
            }
          }
        }
      }
    }
  `)
  // After converting exports.createPages from promises to async/await, I'm
  // not quite sure if this is the correct way to perform error handling.
  if (result.errors) {
    return Promise.reject(result.errors)
  }
  const posts = result.data.allMarkdownRemark.edges
  const allowedPosts = posts.filter(post => {
    if (process.env.NODE_ENV === 'production' && post.node.frontmatter.draft) {
      return false
    }
    return true
  })
  const trending = await getPageViews('30daysAgo')
  const allTime = await getPageViews('2005-01-01')
  const pageViews = {
    trending: trending.filter(removeNonPostPagesFromAnalytics),
    allTime: allTime.filter(removeNonPostPagesFromAnalytics)
  }
  createPostPages(createPage, allowedPosts, pageViews)
  createTagPages(createPage, allowedPosts, pageViews)
  createHomePages(createPage, allowedPosts, pageViews)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value
    })
  }
}
