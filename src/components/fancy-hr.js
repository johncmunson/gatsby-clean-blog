import React from 'react'
import styled from 'styled-components'

const FancyHr = styled('hr')`
  border: 0;
  height: 1px;
  width: 10em;
  margin: 1.5em auto 2em auto;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`

export default FancyHr
