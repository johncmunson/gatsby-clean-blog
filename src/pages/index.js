import React from 'react'
import { graphql } from 'gatsby'
import Bio from '../components/bio'
import Link from '../components/link'
import { rhythm } from '../utils/typography'
import Layout from '../components/layout'
import Img from 'gatsby-image'

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <Bio />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        {node.frontmatter.cover && (
          <Img fluid={node.frontmatter.cover.childImageSharp.fluid} />
        )}
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
  </Layout>
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
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 1000
                  quality: 90
                  traceSVG: { color: "#2B2B2F" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
