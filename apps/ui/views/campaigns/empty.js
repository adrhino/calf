import {
  flatButton, type, mediumMargin, headerHeight, centerOfParent
} from 'style'
import { view, dom } from 'view'

const { div, h1, p, a } = dom

const styles = {
  welcome: [
    centerOfParent(),
    {
      maxWidth: '520px',
      textAlign: 'center'
    }
  ],
  container: {
    background: 'radial-gradient(#0B1F65, #020613)',
    height: `calc(100% - ${headerHeight}px)`,
    paddingTop: `${headerHeight}px`
  },
  h1: type('largeHeader', {
    textAlign: 'center',
    color: 'white'
  }),
  p: type('largeBody', {
    textAlign: 'center',
    margin: `${mediumMargin}px 0`,
    color: 'white'
  }),
  button: [
    flatButton('hot', {
      display: 'inline-block',
      padding: '13px 27px'
    }),
    type('mediumCaps')
  ]
}

export default view((props) => (
  div({ style: styles.container },
    div({ style: styles.welcome },
      h1({ style: styles.h1 }, 'Welcome to AdRhino'),
      p({ style: styles.p }, `
        AdRhino is a platform for building beautiful ad units, worthy of your \
        high quality content. To get started, try creating a new campaign.
      `),
      a({
        style: styles.button,
        href: '/campaigns/new'
      }, 'Create new ad campaign')))
))
