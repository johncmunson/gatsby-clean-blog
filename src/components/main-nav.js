import React from 'react'
import { rhythm } from '../utils/typography'
import Link from './link'
import { withPrefix } from 'gatsby'

const MainNav = ({ location = {} }) => {
  const isHomepage = location.pathname === withPrefix('/')
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        lineHeight: rhythm(1.5)
      }}
    >
      {!isHomepage && <Link to="/">Home</Link>}
      <Link to="/about/">About</Link>
      <Link to="/tags/">Tag Index</Link>
      <Link to="/contact/">Contact</Link>
    </div>
  )
}

export default MainNav
