import React from 'react'
import functional from 'react-functional'
import Home from 'components/home'

let { html, body, script } = React.DOM

let render = (props) => (
  html({},
    body({}, Home(props)),
    script({ src: 'client.js' }))
)

export default (props) => React.createElement(functional({ render }), props)
