import React from 'react'
import Layout from '../components/layout'
import Link from '../components/link'
import MainNav from '../components/main-nav'
import QuickNav from '../components/quick-nav'
import FancyHr from '../components/fancy-hr'
import Text from '../components/text'
import { sortAndGroupByStartingLetter } from '../utils'
import { rhythm } from '../utils/typography'

// TO-DO: Figure out why the tag-index page isn't exactly in alphabetical order... a, o, c

const TagIndexTemplate = ({ pageContext, location }) => {
  const { tags, pageViews } = pageContext
  const groupedTags = sortAndGroupByStartingLetter(tags)
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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.keys(groupedTags).map(char => (
          <div key={char} style={{ marginRight: '2em', marginBottom: '2em' }}>
            <Text
              size="1.2em"
              style={{ marginBottom: '0.5em', borderBottom: 'solid 0.5px' }}
            >
              <b>{char}</b>
            </Text>
            <ul
              style={{
                listStyleType: 'none',
                listStylePosition: 'inside',
                margin: 0,
                padding: 0,
                lineHeight: 0.8
              }}
            >
              {groupedTags[char].map(t => (
                <li key={t}>
                  <Link key={t} to={`/tags/${t}/`}>
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default TagIndexTemplate
