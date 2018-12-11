/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const ReactGA = require('react-ga')
ReactGA.initialize('UA-130692445-1')

// There is also a gatsby-plugin for google analytics that could be used.
// Find instructions for setting it up in the official Gatsby docs.
// https://www.gatsbyjs.org/docs/adding-analytics/#adding-analytics

exports.onRouteUpdate = (state, page, pages) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(state.location.pathname)
  }
}

const getPolyfills = () => {
  if (!('IntersectionObserver' in window)) {
    require('intersection-observer')
  }
}

exports.onClientEntry = () => {
  getPolyfills()
}
