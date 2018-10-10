import React from 'react'
import Bio from './bio'

const Footer = ({ prev, next }) => (
  <div>
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
          <Link to={prev} rel="prev">
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
          <Link to={next} rel="next">
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
)
export default Footer
