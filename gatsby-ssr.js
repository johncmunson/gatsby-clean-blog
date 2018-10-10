/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

// Move Typography.js styles to the top of the head section so they're
// loaded first and can more easily be overridden elsewhere without the
// use of !important.
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  headComponents.sort((x, y) => {
    if (x.key === 'TypographyStyle') {
      return -1
    } else if (y.key === 'TypographyStyle') {
      return 1
    }
    return 0
  })
  replaceHeadComponents(headComponents)
}
