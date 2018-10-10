/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

// const createTagPages = (createPage, posts) => {
//   const tagPageTemplate = path.resolve(`src/templates/tags.js`)
//   const allTagsTemplate = path.resolve(`src/templates/all-tags.js`)
//
//   const postsByTags = {}
//
//   posts.forEach(({ node }) => {
//     if (node.frontmatter.tags) {
//       node.frontmatter.tags.forEach(tag => {
//         if (!postsByTags[tag]) {
//           postsByTags[tag] = []
//         }
//
//         postsByTags[tag].push(node)
//       })
//     }
//   })
//
//   const tags = Object.keys(postsByTags)
//
//   createPage({
//     path: `/tags`,
//     component: allTagsTemplate,
//     context: {
//       tags: tags.sort()
//     }
//   })
//
//   tags.forEach(tagName => {
//     const posts = postsByTags[tagName]
//
//     createPage({
//       path: `/tags/${tagName}`,
//       component: tagPageTemplate,
//       context: {
//         posts,
//         tagName
//       }
//     })
//   })
// }

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  return graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            html
            id
            frontmatter {
              date
              path
              title
              excerpt
              tags
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

    // createTagPages(createPage, posts)

    posts.forEach(({ node }, index) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          next: index === 0 ? null : posts[index - 1].node,
          prev: index === posts.length - 1 ? null : posts[index + 1].node
        }
      })
    })
  })
}
