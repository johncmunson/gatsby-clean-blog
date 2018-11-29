import React from 'react'
import Img from 'gatsby-image'
import Text from './text'
import Link from './link'
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
        <div className="post-title" style={{ ...scale(0.5) }}>
          <i>
            <b>
              <Link to={to}>{title}</Link>
            </b>
          </i>
        </div>
      )
    }
    return (
      <div className="post-title" style={{ ...scale(0.5) }}>
        <a href="#" aria-hidden="true" className="anchor">
          <svg
            aria-hidden="true"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            />
          </svg>
        </a>
        <i>
          <b>{title}</b>
        </i>
      </div>
    )
  }
  return (
    <CoverWrapper to={to}>
      <Img fluid={img} style={{ borderRadius: '0.2em' }} />
      <CoverText>
        <Text size="0.8em">
          <i>{date}</i>
        </Text>
        {buildCoverTitle()}
      </CoverText>
    </CoverWrapper>
  )
}
