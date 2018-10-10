import React from 'react'
import { graphql } from 'gatsby'
// import Bio from '../components/bio'
import Link from '../components/link'
import { rhythm } from '../utils/typography'
// import Layout from '../components/layout'

const IndexPage = ({ data, location }) => (
  <div>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <h4
          style={{
            marginBottom: rhythm(1 / 4)
          }}
        >
          <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
        </h4>
        <small>{node.frontmatter.date}</small>
        <p
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.excerpt || node.excerpt
          }}
        />
      </div>
    ))}
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            path
            excerpt
            tags
          }
          excerpt
        }
      }
    }
  }
`
