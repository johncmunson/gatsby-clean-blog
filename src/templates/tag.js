import React from 'react'
import Layout from '../components/layout'
import Link from '../components/link'
import MainNav from '../components/main-nav'
import QuickNav from '../components/quick-nav'
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
          <QuickNav
            pageViews={pageViews}
            style={{ marginTop: '1em', lineHeight: rhythm(1), fontSize: '1em' }}
          />
        </div>
      )}
    >
      <span>Posts about {tagName}:</span>
      <ul>
        {posts.map(post => {
          return (
            <li key={post}>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default TagTemplate
