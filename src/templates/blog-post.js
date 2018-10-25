import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Link from '../components/link'
import Helmet from 'react-helmet'
import Bio from '../components/bio'
import Text from '../components/text'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import slugify from '@sindresorhus/slugify'
import StickyBox from 'react-sticky-box'

const NavLink = styled.a`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  display: block;
  margin-left: ${props => (props.depth - 1) * 0.5 + 'em'};
  opacity: 0.75;
  :hover {
    opacity: 1;
  }
`

const generateHeadingNumbers = headings => {
  let stack = []
  headings.forEach(heading => {
    let depth = heading.depth
    if (depth > stack.length) {
      while (depth > stack.length) {
        stack.push(1)
      }
    } else {
      while (depth < stack.length) {
        stack.pop()
      }
      stack[stack.length - 1]++
    }
    heading.tocNumber = stack.join('.')
  })
}

const Template = ({ data, location, pageContext }) => {
  const { markdownRemark: post, site } = data
  const { frontmatter, html, headings } = post
  const { title, date, excerpt, path } = frontmatter
  const { next, prev } = pageContext
  if (headings.length) generateHeadingNumbers(headings)
  return (
    <Layout
      location={location}
      renderNav={() => {
        if (headings.length) {
          return (
            <StickyBox
              offsetTop={5}
              style={{
                marginLeft: '2em',
                marginTop: '11.25em',
                lineHeight: rhythm(1),
                fontStyle: 'italic'
              }}
            >
              <Text
                size="0.85em"
                style={{ opacity: 0.75, marginBottom: '0.5em' }}
              >
                Outline:
              </Text>
              {headings.map(
                (heading, i) =>
                  heading.depth < 4 && (
                    <NavLink
                      key={i}
                      depth={heading.depth}
                      href={`${path}#${slugify(heading.value)}`}
                    >
                      <Text
                        size="0.7em"
                        style={{ lineHeight: 1.2, marginBottom: '0.5em' }}
                      >
                        <span style={{ marginRight: '0.25em' }}>
                          {heading.tocNumber}.
                        </span>
                        {heading.value}
                      </Text>
                    </NavLink>
                  )
              )}
            </StickyBox>
          )
        }
      }}
    >
      <Helmet
        title={`${title} | ${site.siteMetadata.title}`}
        meta={[{ name: 'description', content: excerpt }]}
        htmlAttributes={{ lang: 'en' }}
      />
      <div>
        <div style={{ marginBottom: '0.2em', ...scale(0.5) }}>
          <i>
            <b>{title}</b>
          </i>
        </div>
        <Text size="0.8em" style={{ marginBottom: '3.5em' }}>
          <i>{date}</i>
        </Text>
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
