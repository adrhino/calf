import { view, dom } from 'view'
import reset from './reset'

let { html, body, script, head, meta, style } = dom

export default view((props) => {
  return html({},
    head({},
      meta({
        name: 'viewport',
        content: [
          'width=device-width',
          'initial-scale=1.0',
          'maximum-scale=1.0',
          'user-scalable=no'
        ].join(', ')
      }),
      style({ dangerouslySetInnerHTML: { __html: reset } })),
    body({}, props.body(props),
      script({ dangerouslySetInnerHTML: { __html: `
        var __TREE__ = ${JSON.stringify(props.tree)};
      ` }}),
      script({ src: 'client.js' })))
})
