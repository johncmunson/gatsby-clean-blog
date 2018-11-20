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
import { Link as ScrollLink } from 'react-scroll'
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

// class NavHeadings extends Component {
//   state = {
//     activeNavHeading: null
//   }
//   handleSetActive = e => {
//     console.log(e)
//     this.setState({ activeNavHeading: e })
//     history.replaceState(undefined, undefined, `#${e}`)
//   }
//   handleNavHeadingClick = heading => {
//     this.handleSetActive(heading)
//   }
//   render() {
//     return this.props.headings.map((heading, i) => (
//       <NavLink
//         className={
//           this.state.activeNavHeading === slugify(heading.value) &&
//           'active-nav-link'
//         }
//         key={i}
//         depth={heading.depth}
//         to={`${slugify(heading.value)}`}
//         smooth={true}
//         offset={-80}
//         onSetActive={this.handleSetActive}
//         onClick={() => this.handleNavHeadingClick(slugify(heading.value))}
//       >
//         <Text size="0.7em" style={{ lineHeight: 1.2, marginBottom: '0.5em' }}>
//           <span style={{ marginRight: '0.25em' }}>{heading.tocNumber}.</span>
//           <span>{heading.value}</span>
//         </Text>
//       </NavLink>
//     ))
//   }
// }

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
    activeNavHeading: null,
    handleObserverChangeAttempts: 0
  }
  handleObserverChange = (e, heading) => {
    this.setState({
      ...this.state,
      handleObserverChangeAttempts: this.state.handleObserverChangeAttempts + 1
    })
    if (
      this.state.handleObserverChangeAttempts >
      this.props.data.markdownRemark.headings.length
    )
      this.handleNavHeadingClick(heading)
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

// const Template = ({ data, location, pageContext }) => {
//   const { markdownRemark: post, site } = data
//   const { frontmatter, html, headings } = post
//   const { title, date, excerpt, path } = frontmatter
//   const { next, prev } = pageContext
//   if (headings.length) generateHeadingNumbers(headings)
//   return (
//     <Layout
//       location={location}
//       renderNav={() => {
//         if (headings.length) {
//           return (
//             <StickyBox
//               offsetTop={5}
//               style={{
//                 marginLeft: '2em',
//                 marginTop: '11.25em',
//                 lineHeight: rhythm(1),
//                 fontStyle: 'italic'
//               }}
//             >
//               <Text
//                 size="0.85em"
//                 style={{ opacity: 0.75, marginBottom: '0.5em' }}
//               >
//                 Outline:
//               </Text>
//               <NavHeadings headings={headings} />
//             </StickyBox>
//           )
//         }
//       }}
//     >
//       <Helmet
//         title={`${title} | ${site.siteMetadata.title}`}
//         meta={[{ name: 'description', content: excerpt }]}
//         htmlAttributes={{ lang: 'en' }}
//       />
//       <div>
//         <div style={{ marginBottom: '0.2em', ...scale(0.5) }}>
//           <i>
//             <b>{title}</b>
//           </i>
//         </div>
//         <Text size="0.8em" style={{ marginBottom: '3.5em' }}>
//           <i>{date}</i>
//         </Text>
//         <div
//           style={{ marginBottom: rhythm(2) }}
//           dangerouslySetInnerHTML={{ __html: html }}
//         />
//         <Bio />
//         <hr />
//         <ul
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//             listStyle: 'none',
//             padding: 0,
//             margin: 0
//           }}
//         >
//           <li>
//             {prev && (
//               <Link to={prev.frontmatter.path} rel="prev">
//                 <small style={{ letterSpacing: 1.2 }}>
//                   <i>
//                     <b>← Previous</b>
//                   </i>
//                 </small>
//               </Link>
//             )}
//           </li>
//           <li>
//             {next && (
//               <Link to={next.frontmatter.path} rel="next">
//                 <small style={{ letterSpacing: 1.2 }}>
//                   <i>
//                     <b>Next →</b>
//                   </i>
//                 </small>
//               </Link>
//             )}
//           </li>
//         </ul>
//       </div>
//     </Layout>
//   )
// }

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

// Example of how to replace markdown elements with custom react components...

// STEP 1:
// import rehypeReact from "rehype-react"
// import ScrollableAnchor from 'react-scrollable-anchor'
// import { configureAnchors } from 'react-scrollable-anchor'

// STEP 2:
// const ScrollableH1 = ({ id, children }) => <ScrollableAnchor id={id}><h1>{ children }</h1></ScrollableAnchor>
// const ScrollableH2 = ({ id, children }) => <ScrollableAnchor id={id}><h2>{ children }</h2></ScrollableAnchor>
// const ScrollableH3 = ({ id, children }) => <ScrollableAnchor id={id}><h3>{ children }</h3></ScrollableAnchor>
// const ScrollableH4 = ({ id, children }) => <ScrollableAnchor id={id}><h4>{ children }</h4></ScrollableAnchor>
// const ScrollableH5 = ({ id, children }) => <ScrollableAnchor id={id}><h5>{ children }</h5></ScrollableAnchor>
// const ScrollableH6 = ({ id, children }) => <ScrollableAnchor id={id}><h6>{ children }</h6></ScrollableAnchor>

// STEP 3:
// const renderAst = new rehypeReact({
//   createElement: React.createElement,
//   components: {
//     h1: ScrollableH1,
//     h2: ScrollableH2,
//     h3: ScrollableH3,
//     h4: ScrollableH4,
//     h5: ScrollableH5,
//     h6: ScrollableH6
//   }
// }).Compiler

// STEP 4:

// replace...
// <div dangerouslySetInnerHTML={{ __html: html }} />

// with...
// <div>{ renderAst(htmlAst) }</div>

// STEP 5:
// markdownRemark(frontmatter: { path: { eq: $path } }) {
//   html
//   htmlAst
