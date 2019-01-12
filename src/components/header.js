import React, { Component } from 'react'
import Link from './link'
import Headroom from 'react-headroom'
import SmallCap from './small-cap'
import { rhythm, scale } from '../utils/typography'
import PropTypes from 'prop-types'

// Refactor to use withPrefix()
// https://www.gatsbyjs.org/docs/gatsby-link/#prefixed-paths-helper

const Header = ({ siteTitle, location, renderIcon, preventScroll }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const getScale = () => {
    if (location && location.pathname === rootPath) {
      return 1.25
    } else {
      return 0.5
    }
  }
  const getMenuOffset = () => {
    if (location && location.pathname === rootPath) {
      return '3px'
    } else {
      return '7px'
    }
  }
  let target
  const setHeadroomRef = element => (target = element)
  const onWheel = e => {
    preventScroll && e.preventDefault()
  }
  return (
    <Headroom
      onWheel={onWheel}
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
          padding: `${rhythm(0.25)} ${rhythm(0.5)}`,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Link to="/">
          <SmallCap>{siteTitle}</SmallCap>
        </Link>
        <div style={{ position: 'relative', top: getMenuOffset() }}>
          {renderIcon()}
        </div>
      </div>
    </Headroom>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

export default Header
