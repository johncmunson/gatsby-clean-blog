import React from 'react'
import Layout from '../components/layout'
import Link from '../components/link'

const TagIndexTemplate = ({ pageContext, location }) => {
  const { tags } = pageContext
  return (
    <Layout location={location}>
      <ul>
        {tags.map(tag => {
          return (
            <li key={tag}>
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default TagIndexTemplate
