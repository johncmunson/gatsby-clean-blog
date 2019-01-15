import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import GithubCorner from 'react-github-corner'
import styled, { keyframes } from 'styled-components'
import { rhythm } from '../utils/typography'
import { disableScrollAtTopAndBottom } from '../utils'
import BurgerIcon from '../images/baseline-menu-24px.svg'
import CloseIcon from '../images/baseline-close-24px.svg'

const getHoveredIcon = icon => styled(icon)`
  :hover {
    cursor: pointer;
  }
`

const Burger = getHoveredIcon(BurgerIcon)
const Close = getHoveredIcon(CloseIcon)

const Overlay = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  opacity: ${props => props.opacity};
  visibility: ${props => props.visibility};
  background-color: white;
  transition: 0.25s;
  overflow-y: auto;
`

const Hide = styled.div`
  @media (max-width: 101em) {
    display: none;
  }
`

class Layout extends Component {
  state = {
    overlayActive: false
  }
  toggleOverlay = () =>
    this.setState({ overlayActive: !this.state.overlayActive })
  setOverlayRef = element => (this.target = element)
  onWheel = e => disableScrollAtTopAndBottom(e, this.target)
  render() {
    const {
      children,
      location,
      renderOverlayContents,
      renderRightSidebar,
      renderLeftSidebar
    } = this.props
    const { overlayActive } = this.state
    const { toggleOverlay, setOverlayRef, onWheel } = this
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' }
              ]}
            >
              <html lang="en" />
            </Helmet>
            <GithubCorner href="https://github.com/johncmunson/gatsby-clean-blog" />
            <Overlay
              ref={setOverlayRef}
              opacity={overlayActive ? '0.98' : '0'}
              visibility={overlayActive ? 'visible' : 'hidden'}
              onWheel={onWheel}
            >
              <div
                style={{
                  margin: `${rhythm(1)} auto`,
                  maxWidth: rhythm(22),
                  padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                  textAlign: 'center'
                }}
              >
                {renderOverlayContents && renderOverlayContents()}
              </div>
            </Overlay>
            <Header
              siteTitle={data.site.siteMetadata.title}
              location={location}
              preventScroll={overlayActive}
              renderIcon={() =>
                overlayActive ? (
                  <Close onClick={toggleOverlay} />
                ) : (
                  <Burger onClick={toggleOverlay} />
                )
              }
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Hide style={{ width: rhythm(10), marginRight: '1.5em' }}>
                {renderLeftSidebar && renderLeftSidebar()}
              </Hide>
              <div
                style={{
                  width: rhythm(22),
                  padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
                }}
              >
                {children}
              </div>
              <Hide style={{ width: rhythm(10), marginLeft: '1.5em' }}>
                {renderRightSidebar && renderRightSidebar()}
              </Hide>
            </div>
          </>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
