import React from 'react'
import Link from './link'

export default function Tags({ list = [], ...props }) {
  return (
    <div {...props}>
      <span>Tags: </span>
      <span>
        {list.map((tag, i) => (
          <>
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'underline' }}>
              {tag}
            </Link>
            {i !== list.length - 1 && <span>, </span>}
          </>
        ))}
      </span>
    </div>
  )
}
