import React from 'react'
import Layout from '../components/layout'
import Link from '../components/link'
import MainNav from '../components/main-nav'
import QuickNav from '../components/quick-nav'
import FancyHr from '../components/fancy-hr'
import { rhythm } from '../utils/typography'

const TagIndexTemplate = ({ pageContext, location }) => {
  const { tags, pageViews } = pageContext
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
      <ul>
        {tags.map(tag => {
          return (
            <li key={tag}>
              <Link to={`/tags/${tag}/`}>{tag}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default TagIndexTemplate
