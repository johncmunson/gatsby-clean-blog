import React, { Component } from 'react'
import styled from 'styled-components'
import { slugToTitleCase } from '../utils'
import { QuickNavLink } from './link'
import Text from './text'
import {
  SIDEBAR_HEADER_SIZE,
  SIDEBAR_LINK_SIZE,
  SIDEBAR_LINK_OPACITY,
  SIDEBAR_LINK_LINE_HEIGHT,
  SIDEBAR_LINK_MARGIN_BOTTOM
} from '../../constants'

// THIS COMPONENT IS KIND OF A MESS AND SHOULD BE REFACTORED AT SOME POINT.

// ALSO, MOVING STYLES INTO A CONSTANTS FILE WAS A SILLY IDEA. SEARCH THE
// PROJECT FOR '../../constants' AND REFACTOR.

// ISSUES:
// 1. THE SELECTED TAB SHOULD PERSIST WHEN A LINK IS CLICKED
// 2. The current article should be bolded or underlined

const TabTitle = styled.span`
  :hover {
    cursor: pointer;
  }
`

export default class QuickNav extends Component {
  state = { tabIndex: 1 }
  handleTabClick = tabIndex => this.setState({ tabIndex: tabIndex })
  render() {
    const {
      pageViews: { trending, allTime },
      ...props
    } = this.props
    const getTabStyles = tabIndex =>
      tabIndex === this.state.tabIndex
        ? { borderBottom: 'solid 1px', fontWeight: 'bold' }
        : {}
    return (
      <div {...props}>
        <Text
          size={SIDEBAR_HEADER_SIZE}
          style={{
            opacity: SIDEBAR_LINK_OPACITY,
            marginBottom: SIDEBAR_LINK_MARGIN_BOTTOM
          }}
        >
          <TabTitle
            onClick={() => this.handleTabClick(1)}
            style={getTabStyles(1)}
          >
            Trending
          </TabTitle>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <TabTitle
            onClick={() => this.handleTabClick(2)}
            style={getTabStyles(2)}
          >
            All Time
          </TabTitle>
        </Text>
        {(this.state.tabIndex === 1 ? trending : allTime).map((t, i) => (
          <QuickNavLink key={i} to={t[0]}>
            <Text
              size={SIDEBAR_LINK_SIZE}
              style={{
                lineHeight: SIDEBAR_LINK_LINE_HEIGHT,
                marginBottom: SIDEBAR_LINK_MARGIN_BOTTOM
              }}
            >
              <span>
                {i + 1}
                .&nbsp;
              </span>
              <span>{slugToTitleCase(t[0])}</span>
            </Text>
          </QuickNavLink>
        ))}
      </div>
    )
  }
}
