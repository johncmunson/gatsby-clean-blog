import React, { Component, createElement } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Link from '../components/link'
import Helmet from 'react-helmet'
import Bio from '../components/bio'
import Text from '../components/text'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import slugify from '@sindresorhus/slugify'
import StickyBox from 'react-sticky-box'
import './blog-post.css'
import { Link as ScrollLink, Events } from 'react-scroll'
import Observer from '@researchgate/react-intersection-observer'
import rehypeReact from 'rehype-react'

const NavLink = styled(ScrollLink)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  display: block;
  padding-left: ${props => (props.depth - 1) * 0.5 + 'em'};
  opacity: 0.75;
  :hover {
    opacity: 1;
    cursor: pointer;
  }
`

const NavHeadings = ({ headings, activeNavHeading, handleNavHeadingClick }) =>
  headings.map((heading, i) => (
    <NavLink
      key={i}
      className={
        activeNavHeading === slugify(heading.value) && 'active-nav-link'
      }
      depth={heading.depth}
      to={`${slugify(heading.value)}`}
      smooth={true}
      offset={-80}
      onClick={() => handleNavHeadingClick(slugify(heading.value))}
    >
      <Text size="0.7em" style={{ lineHeight: 1.2, marginBottom: '0.5em' }}>
        <span style={{ marginRight: '0.3em' }} />
        <span>{heading.value}</span>
      </Text>
    </NavLink>
  ))

const getObservedHeading = (el, onChange) => ({ id, children }) => (
  <Observer onChange={e => onChange(e, id)} rootMargin="0% 0% -85%">
    {createElement(el, { id: id }, children)}
  </Observer>
)

const getRenderAst = components =>
  new rehypeReact({
    createElement: createElement,
    components: components
  }).Compiler

class Template extends Component {
  state = {
    activeNavHeading: this.props.data.markdownRemark.headings.length
      ? slugify(this.props.data.markdownRemark.headings[0].value)
      : null,
    handleObserverChangeAttempts: 0,
    animatingScroll: false
  }
  componentDidMount() {
    let that = this
    Events.scrollEvent.register('begin', function() {
      that.setState({ ...this.state, animatingScroll: true })
    })
    Events.scrollEvent.register('end', function() {
      that.setState({ ...this.state, animatingScroll: false })
    })
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }
  handleObserverChange = (e, heading) => {
    this.setState({
      ...this.state,
      handleObserverChangeAttempts: this.state.handleObserverChangeAttempts + 1
    })
    if (
      this.state.handleObserverChangeAttempts >
        this.props.data.markdownRemark.headings.length &&
      !this.state.animatingScroll
    ) {
      this.handleNavHeadingClick(heading)
    }
  }
  handleNavHeadingClick = heading => {
    this.setState({ ...this.state, activeNavHeading: heading })
    history.replaceState(undefined, undefined, `#${heading}`)
  }
  markdownToComponentMap = {
    h1: getObservedHeading('h1', this.handleObserverChange),
    h2: getObservedHeading('h2', this.handleObserverChange),
    h3: getObservedHeading('h3', this.handleObserverChange),
    h4: getObservedHeading('h4', this.handleObserverChange),
    h5: getObservedHeading('h5', this.handleObserverChange),
    h6: getObservedHeading('h6', this.handleObserverChange)
  }
  render() {
    const { markdownRemark: post, site } = this.props.data
    const { frontmatter, html, htmlAst, headings } = post
    const { title, date, excerpt, path } = frontmatter
    const { next, prev } = this.props.pageContext
    if (headings.length) generateHeadingNumbers(headings)
    return (
      <Layout
        location={location}
        renderNav={() => {
          if (headings.length) {
            return (
              <StickyBox
                offsetTop={5}
                style={{
                  marginLeft: '2em',
                  marginTop: '11.25em',
                  lineHeight: rhythm(1)
                }}
              >
                <Text
                  size="0.85em"
                  style={{ opacity: 0.75, marginBottom: '0.5em' }}
                >
                  Contents
                </Text>
                <NavHeadings
                  headings={headings}
                  activeNavHeading={this.state.activeNavHeading}
                  handleNavHeadingClick={this.handleNavHeadingClick}
                />
              </StickyBox>
            )
          }
        }}
      >
        <Helmet
          title={`${title} | ${site.siteMetadata.title}`}
          meta={[{ name: 'description', content: excerpt }]}
          htmlAttributes={{ lang: 'en' }}
        />
        <div>
          <div style={{ marginBottom: '0.2em', ...scale(0.5) }}>
            <i>
              <b>{title}</b>
            </i>
          </div>
          <Text size="0.8em" style={{ marginBottom: '3.5em' }}>
            <i>{date}</i>
          </Text>
          <div style={{ marginBottom: rhythm(2) }}>
            {getRenderAst(this.markdownToComponentMap)(htmlAst)}
          </div>
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
                <Link to={prev.frontmatter.path} rel="prev">
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
                <Link to={next.frontmatter.path} rel="next">
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
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      htmlAst
      headings {
        value
        depth
      }
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
      }
    }
  }
`

export default Template

// This function is useful for creating numbers for your headings.
// There is no return value, the function mutates the headers array in place.
// Example... 1, 1.1, 2.1.2, etc.
// const generateHeadingNumbers = headings => {
//   let stack = []
//   headings.forEach(heading => {
//     let depth = heading.depth
//     if (depth > stack.length) {
//       while (depth > stack.length) {
//         stack.push(1)
//       }
//     } else {
//       while (depth < stack.length) {
//         stack.pop()
//       }
//       stack[stack.length - 1]++
//     }
//     heading.tocNumber = stack.join('.')
//   })
// }
