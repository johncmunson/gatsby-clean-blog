import React, { Fragment } from 'react'
import Link from './link'

export default function Tags({ list = [], ...props }) {
  return (
    <div {...props}>
      <span>Tags: </span>
      <span>
        {list.map((tag, i) => (
          <Fragment key={i}>
            <Link to={`/tags/${tag}/`} style={{ textDecoration: 'underline' }}>
              {tag}
            </Link>
            {i !== list.length - 1 && <span>, </span>}
          </Fragment>
        ))}
      </span>
    </div>
  )
}
