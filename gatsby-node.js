/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const config = require('./config.js')

const createTagPages = (createPage, posts) => {
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
    path: `/tags`,
    component: tagIndexTemplate,
    context: {
      tags: tags.sort()
    }
  })
  tags.forEach(tagName => {
    const posts = postsByTags[tagName]
    createPage({
      path: `/tags/${tagName}`,
      component: tagTemplate,
      context: {
        posts,
        tagName
      }
    })
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const homePageTemplate = path.resolve('./src/templates/home.js')
  return graphql(`
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges
    const allowedPosts = posts.filter(post => {
      if (
        process.env.NODE_ENV === 'production' &&
        post.node.frontmatter.draft
      ) {
        return false
      }
      return true
    })
    const postsPerPage = config.postsPerPage
    const numPages = Math.ceil(posts.length / postsPerPage)
    allowedPosts.forEach(({ node }, index) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev: index === 0 ? null : allowedPosts[index - 1].node,
          next:
            index === allowedPosts.length - 1
              ? null
              : allowedPosts[index + 1].node
        }
      })
    })
    createTagPages(createPage, allowedPosts)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: homePageTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      })
    })
  })
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
