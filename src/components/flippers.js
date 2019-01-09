import React from 'react'
import Link from './link'

export default function Flippers({ prevPath, nextPath }) {
  return (
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
        {prevPath && (
          <Link to={prevPath}>
            <small style={{ letterSpacing: 1.2 }}>
              <i>
                <b>← Previous</b>
              </i>
            </small>
          </Link>
        )}
      </li>
      <li>
        {nextPath && (
          <Link to={nextPath}>
            <small style={{ letterSpacing: 1.2 }}>
              <i>
                <b>Next →</b>
              </i>
            </small>
          </Link>
        )}
      </li>
    </ul>
  )
}
