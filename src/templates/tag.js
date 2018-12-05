import React from 'react'
import Layout from '../components/layout'
import Link from '../components/link'

const TagTemplate = ({ pageContext, location }) => {
  const { posts = [], tagName } = pageContext
  return (
    <Layout location={location}>
      <span>Posts about {tagName}:</span>
      <ul>
        {posts.map(post => {
          return (
            <li key={post}>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default TagTemplate
