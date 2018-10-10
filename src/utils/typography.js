import Typography from 'typography'

const typography = new Typography({
  title: 'practical typography',
  baseFontSize: '18px',
  baseLineHeight: 1.4,
  scaleRatio: 1.5,
  headerFontFamily: ['Source Sans Pro', 'Verdana', 'sans-serif'],
  bodyFontFamily: ['Source Serif Pro', 'Georgia', 'serif'],
  headerGray: 20,
  bodyGray: 20,
  blockMarginBottom: 1,
  includeNormalize: true,
  // HACK: This is necessary until typography.js natively supports breakpoints
  //       and CSS locks. Alternatively, you could use the same CSS as below in
  //       a stylesheet in conjunction with !important declarations.
  //       https://github.com/KyleAMathews/typography.js/issues/75
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    html: {
      fontSize: '2.4vw',
      textRendering: 'optimizeLegibility'
    },
    '@media all and (min-width: 1000px) {html{font-size: 24px}}': {},
    '@media all and (max-width: 520px) {html{font-size: 18px}}': {}
  })
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
