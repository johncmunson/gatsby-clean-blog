import React from 'react'
import Layout from '../components/layout'
import Link from '../components/link'
import MainNav from '../components/main-nav'
import QuickNav from '../components/quick-nav'
import Text from '../components/text'
import FancyHr from '../components/fancy-hr'
import { rhythm } from '../utils/typography'

const TagTemplate = ({ pageContext, location }) => {
  const { posts = [], tagName, pageViews } = pageContext
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
    >
      <div>
        Posts tagged with...{' '}
        <span style={{ fontSize: '1.4em', borderBottom: 'solid 0.5px' }}>
          {tagName}
        </span>
      </div>
      <br />
      <ul>
        {posts.map((post, i) => {
          return (
            <li key={i}>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default TagTemplate
