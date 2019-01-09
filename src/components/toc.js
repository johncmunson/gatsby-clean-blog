import React from 'react'
import Text from './text'
import styled from 'styled-components'
import { TocLink } from './link'
import { slugify } from '../utils'
import {
  SIDEBAR_HEADER_SIZE,
  SIDEBAR_LINK_SIZE,
  SIDEBAR_LINK_OPACITY,
  SIDEBAR_LINK_LINE_HEIGHT,
  SIDEBAR_LINK_MARGIN_BOTTOM
} from '../../constants'

const Toc = ({ headings, activeHeader }) => (
  <div>
    <Text
      size={SIDEBAR_HEADER_SIZE}
      style={{
        opacity: SIDEBAR_LINK_OPACITY,
        marginBottom: SIDEBAR_LINK_MARGIN_BOTTOM
      }}
    >
      Contents
    </Text>
    {headings.map((heading, i) => (
      <TocLink
        key={i}
        className={activeHeader === slugify(heading.value) && 'active-toc-link'}
        depth={heading.depth}
        to={`${slugify(heading.value)}`}
        smooth={true}
        offset={-80}
      >
        <Text
          size={SIDEBAR_LINK_SIZE}
          style={{
            lineHeight: SIDEBAR_LINK_LINE_HEIGHT,
            marginBottom: SIDEBAR_LINK_MARGIN_BOTTOM,
            paddingLeft: '0.3em'
          }}
        >
          {heading.value}
        </Text>
      </TocLink>
    ))}
  </div>
)

export default Toc
