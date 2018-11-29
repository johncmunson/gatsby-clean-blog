import React from 'react'
import { graphql } from 'gatsby'
import Bio from '../components/bio'
import Link from '../components/link'
import { rhythm } from '../utils/typography'
import Layout from '../components/layout'
import CoverImage from '../components/cover-image'

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <Bio />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        {data.site.siteMetadata.homepageCoverImages ? (
          <CoverImage
            img={node.frontmatter.cover.childImageSharp.fluid}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            to={node.frontmatter.path}
          />
        ) : (
          <>
            <h4
              style={{
                marginBottom: rhythm(1 / 12)
              }}
            >
              <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
            </h4>
            <small
              style={{
                display: 'block',
                marginBottom: rhythm(1 / 4)
              }}
            >
              {node.frontmatter.date}
            </small>
          </>
        )}
        <p
          style={{ marginBottom: `${rhythm(1.5)}` }}
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
    site {
      siteMetadata {
        title
        homepageCoverImages
        blogPostCoverImages
      }
    }
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

// WHAT THE TITLE AND DATE LOOKED LIKE BEFORE THE COVER IMAGE
// <h4
//   style={{
//     marginBottom: rhythm(1 / 4)
//   }}
// >
//   <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
// </h4>
// <small>{node.frontmatter.date}</small>
