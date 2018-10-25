import React from 'react'

export default ({ size, children, style }) => (
  <div style={{ fontSize: size, ...style }}>{children}</div>
)
