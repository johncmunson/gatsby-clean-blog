import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { rhythm } from '../utils/typography'

const Bio = ({ data }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: rhythm(1.5)
    }}
  >
    <div style={{ marginRight: rhythm(0.5) }}>
      <Img
        fixed={data.file.childImageSharp.fixed}
        alt={`John Munson`}
        style={{ borderRadius: '50%' }}
      />
    </div>
    <div style={{ fontSize: '0.8em' }}>
      Written by <strong>John Munson</strong> who lives and works in St. Louis
      building useful things.{' '}
      <a href="https://twitter.com/curtismunson">
        You should follow him on Twitter.
      </a>
    </div>
  </div>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "avatar.png" }) {
          childImageSharp {
            fixed(width: 75) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <Bio data={data} />}
  />
)
