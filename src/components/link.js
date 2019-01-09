import { Link } from 'gatsby'
import styled from 'styled-components'
import { Link as ScrollLink } from 'react-scroll'
import { SIDEBAR_LINK_OPACITY } from '../../constants'

const baseStyles = `
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

const sidebarStyles = `
  display: block;
  opacity: ${SIDEBAR_LINK_OPACITY};
  :hover {
    opacity: 1;
    cursor: pointer;
  };
`

export const QuickNavLink = styled(Link)`
  ${baseStyles} ${sidebarStyles};
`

export const TocLink = styled(ScrollLink)`
  ${baseStyles}
  ${sidebarStyles}
  padding-left: ${props => (props.depth - 1) * 0.5 + 'em'};
`

export default styled(Link)`
  ${baseStyles};
`
