import React from 'react'
import Img from 'gatsby-image'
import Text from './text'
import Link from './link'
import GhAnchor from './gh-anchor'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'

const CoverWrapper = styled.div`
  position: relative;
  color: white;
  margin-bottom: ${props => (props.to ? rhythm(0.5) : rhythm(1.5))};
`

const CoverText = styled.div`
  position: absolute;
  bottom: 8px;
  left: 16px;
`

export default ({ img, title, date, to }) => {
  const buildCoverTitle = () => {
    if (to) {
      return (
        <div
          className="post-title"
          style={{
            ...scale(0.5),
            background: 'rgba(0, 0, 0, 0.5)',
            transform: 'skew(-10deg)'
          }}
        >
          <i>
            <b>
              <Link
                to={to}
                style={{
                  padding: '0 0.25rem',
                  transform: 'skew(10deg)',
                  display: 'inline-block'
                }}
              >
                <span>{title}</span>
              </Link>
            </b>
          </i>
        </div>
      )
    }
    return (
      <div className="post-title" style={{ ...scale(0.5) }}>
        <GhAnchor />
        <i>
          <b
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '0 0.25rem',
              transform: 'skew(-10deg)',
              display: 'inline-block'
            }}
          >
            <span style={{ transform: 'skew(10deg)', display: 'inline-block' }}>
              {title}
            </span>
          </b>
        </i>
      </div>
    )
  }
  return (
    <CoverWrapper to={to}>
      <Img fluid={img} style={{ borderRadius: '0.2em' }} />
      <CoverText>
        <Text
          size="0.8em"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            transform: 'skew(-10deg)',
            padding: '0 0.25rem',
            marginBottom: '0.2em',
            display: 'inline-block'
          }}
        >
          <i style={{ transform: 'skew(10deg)', display: 'inline-block' }}>
            {date}
          </i>
        </Text>
        {buildCoverTitle()}
      </CoverText>
    </CoverWrapper>
  )
}
