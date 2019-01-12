import React from 'react'
import { graphql } from 'gatsby'
import Bio from '../components/bio'
import Link from '../components/link'
import { rhythm } from '../utils/typography'
import Layout from '../components/layout'
import CoverImage from '../components/cover-image'
import Flippers from '../components/flippers'
import MainNav from '../components/main-nav'
import QuickNav from '../components/quick-nav'
import FancyHr from '../components/fancy-hr'
import { slugToTitleCase } from '../utils'

const IndexPage = ({ data, location, pageContext }) => {
  const { currentPage, limit, numPages, skip, pageViews } = pageContext
  const posts = data.allMarkdownRemark.edges
  const allowedPosts = posts.filter(post => {
    if (process.env.NODE_ENV === 'production' && post.node.frontmatter.draft) {
      return false
    }
    return true
  })
  function getPrevPath() {
    return currentPage === 1
      ? null
      : currentPage === 2
      ? `/`
      : `/${currentPage - 1}/`
  }
  function getNextPath() {
    return currentPage === numPages ? null : `/${currentPage + 1}`
  }
  return (
    <Layout
      location={location}
      renderOverlayContents={() => (
        <div style={{ marginTop: rhythm(1.5) }}>
          <MainNav location={location} />
          <FancyHr />
          <QuickNav
            pageViews={pageViews}
            style={{ marginTop: '1em', lineHeight: rhythm(1), fontSize: '1em' }}
          />
        </div>
      )}
    >
      <Bio />
      {allowedPosts.map(({ node }) => (
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
      <Flippers prevPath={getPrevPath()} nextPath={getNextPath()} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query homePageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        homepageCoverImages
        blogPostCoverImages
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
            draft
            cover {
              childImageSharp {
                fluid(maxWidth: 700, maxHeight: 432) {
                  ...GatsbyImageSharpFluid_withWebp
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
