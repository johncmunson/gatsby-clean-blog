import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Link from '../components/link'
import Helmet from 'react-helmet'
import Bio from '../components/bio'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'

const Template = ({ data, location, pageContext }) => {
  const { markdownRemark: post, site } = data
  const { frontmatter, html, headings } = post
  const { title, date, excerpt, path } = frontmatter
  const { next, prev } = pageContext
  return (
    <Layout location={location}>
      <Helmet
        title={`${title} | ${site.siteMetadata.title}`}
        meta={[{ name: 'description', content: excerpt }]}
        htmlAttributes={{ lang: 'en' }}
      />
      <div>
        <h3>{title}</h3>
        <h5>{date}</h5>
        <div
          style={{ marginBottom: rhythm(2) }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Bio />
        <hr />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}
        >
          <li>
            {prev && (
              <Link to={prev.frontmatter.path} rel="prev">
                <small style={{ letterSpacing: 1.2 }}>
                  <i>
                    <b>← Previous</b>
                  </i>
                </small>
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.frontmatter.path} rel="next">
                <small style={{ letterSpacing: 1.2 }}>
                  <i>
                    <b>Next →</b>
                  </i>
                </small>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      headings {
        value
        depth
      }
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
      }
    }
  }
`

export default Template
