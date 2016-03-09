import React from 'react'
import functional from 'react-functional'
import fs from 'fs'

let { div, nav, header, a } = React.DOM
let PASSPORT_CALLBACK_PATH = process.env.PASSPORT_CALLBACK_PATH
let APP_URL = process.env.APP_URL

let render = (props) => {
  let logo = fs.readFileSync(__dirname + '/logo.svg')
  return (
  header({},
    div({ dangerouslySetInnerHTML: { __html: logo } }),
    div({}, 'Welcome to AdRhino'),
    nav({},
      a({}, 'Developers'),
      a({}, 'Campaigns'),
      button({}, 'Logout')))
  )
}

export default (props) => React.createElement(functional({ render }), props)
