import React from 'react'
import Link from './link'
import Headroom from 'react-headroom'
import SmallCap from './small-cap'
import { rhythm, scale } from '../utils/typography'
import PropTypes from 'prop-types'

const Header = ({ siteTitle, location }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const getScale = () => {
    if (location && location.pathname === rootPath) {
      return 1.25
    } else {
      return 0.5
    }
  }
  return (
    <Headroom
      style={{
        margin: '0 auto',
        maxWidth: rhythm(22),
        background: 'white',
        boxShadow: '0px 15px 10px -15px gray'
      }}
    >
      <div
        style={{
          ...scale(getScale()),
          padding: `${rhythm(0.25)} ${rhythm(0.5)}`
        }}
      >
        <Link to="/">
          <SmallCap>{siteTitle}</SmallCap>
        </Link>
      </div>
    </Headroom>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

export default Header
