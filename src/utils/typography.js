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
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    html: {
      fontSize: '2.4vw',
      textRendering: 'optimizeLegibility'
    },
    '.gatsby-resp-image-image, .gatsby-resp-image-background-image, .gatsby-resp-image-wrapper': {
      borderRadius: '0.15em'
    },
    '@media all and (min-width: 1000px)': {
      html: { fontSize: '24px' }
    },
    '@media all and (max-width: 520px)': {
      html: { fontSize: '18px' }
    }
  })
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
