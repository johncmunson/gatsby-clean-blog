import React, { Component, createElement, createRef } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Link from '../components/link'
import Helmet from 'react-helmet'
import Bio from '../components/bio'
import Tags from '../components/tags'
import Text from '../components/text'
import JustComments from '../components/just-comments'
import FancyHr from '../components/fancy-hr'
import Toc from '../components/toc'
import MainNav from '../components/main-nav'
import QuickNav from '../components/quick-nav'
import GhAnchor from '../components/gh-anchor'
import Img from 'gatsby-image'
import CoverImage from '../components/cover-image'
import Flippers from '../components/flippers'
import { rhythm, scale } from '../utils/typography'
import { slugify } from '../utils'
import StickyBox from 'react-sticky-box'
import { Events } from 'react-scroll'
import Observer from '@researchgate/react-intersection-observer'
import rehypeReact from 'rehype-react'
import './blog-post.css'
import { SIDEBAR_LINK_OPACITY, SIDEBAR_HEADER_SIZE } from '../../constants'

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

// Currently not being used, but is useful for
// gernerating numbered headings. To use, include
// this line in the render method of <Template>...
// if (headings.length) generateHeadingNumbers(headings)
const generateHeadingNumbers = headings => {
  let stack = []
  headings.forEach(heading => {
    let depth = heading.depth
    if (depth > stack.length) {
      while (depth > stack.length) {
        stack.push(1)
      }
    } else {
      while (depth < stack.length) {
        stack.pop()
      }
      stack[stack.length - 1]++
    }
    heading.tocNumber = stack.join('.')
  })
}

const sidebarStyles = {
  marginTop: '2em',
  lineHeight: rhythm(1)
}

class BlogPostTemplate extends Component {
  state = {
    activeHeader: this.props.data.markdownRemark.headings.length
      ? slugify(this.props.data.markdownRemark.headings[0].value)
      : null,
    handleObserverChangeAttempts: 0,
    animatingScroll: false
  }
  componentDidMount() {
    if (window.location.hash) {
      this.setState({
        ...this.state,
        activeHeader: window.location.hash.substr(1)
      })
    }
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
      this.props.data.markdownRemark.headings.length
    ) {
      this.setState({ ...this.state, activeHeader: heading })
      history.replaceState(undefined, undefined, `#${heading}`)
    }
  }
  handleOnWheel = e => {
    if (window.scrollY === 0 && window.location.hash) {
      history.replaceState(
        '',
        document.title,
        window.location.pathname + window.location.search
      )
    }
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
    const { title, date, path, tags, excerpt, cover, nav } = frontmatter
    const { next, prev, pageViews } = this.props.pageContext
    const location = this.props.location
    return (
      <Layout
        location={location}
        renderOverlayContents={() => (
          <div style={{ marginTop: rhythm(1.5) }}>
            <MainNav />
            <FancyHr />
            <QuickNav pageViews={pageViews} />
          </div>
        )}
        renderRightSidebar={() => {
          if (headings.length && nav) {
            return (
              <StickyBox
                offsetTop={8}
                style={{ ...sidebarStyles, marginLeft: '2em' }}
              >
                <Toc
                  headings={headings}
                  activeHeader={this.state.activeHeader}
                />
              </StickyBox>
            )
          }
        }}
        renderLeftSidebar={() => {
          // The StickyBox left margin does not have an equivalent in the right sidebar.
          // This is by design to help with symmetry. Remove the left margin if you want
          // to see what I mean.
          if (pageViews) {
            return (
              <StickyBox
                offsetTop={8}
                style={{
                  ...sidebarStyles,
                  marginRight: '2em',
                  marginLeft: '1em'
                }}
              >
                <QuickNav pageViews={pageViews} />
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
        <div onWheel={this.handleOnWheel}>
          {site.siteMetadata.blogPostCoverImages ? (
            <CoverImage
              img={cover.childImageSharp.fluid}
              title={title}
              date={date}
              location={location}
            />
          ) : (
            <>
              <div
                className="post-title"
                style={{ marginBottom: '0.2em', ...scale(0.5) }}
              >
                <GhAnchor />
                <i>
                  <b>{title}</b>
                </i>
              </div>
              <Text size="0.8em" style={{ paddingBottom: `${rhythm(1.5)}` }}>
                <i>{date}</i>
              </Text>
            </>
          )}
          <div style={{ marginBottom: rhythm(2) }}>
            {getRenderAst(this.markdownToComponentMap)(htmlAst)}
          </div>
          <Tags
            list={tags}
            style={{ marginBottom: rhythm(2), fontStyle: 'italic' }}
          />
          <Bio />
          <hr />
          <Flippers
            prevPath={prev && prev.frontmatter.path}
            nextPath={next && next.frontmatter.path}
          />
          <div style={{ marginTop: rhythm(1) }}>
            <JustComments />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        homepageCoverImages
        blogPostCoverImages
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      htmlAst
      headings {
        value
        depth
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
        cover {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 432) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        nav
      }
    }
  }
`
