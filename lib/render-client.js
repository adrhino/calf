import React from 'react'
import Baobab from 'baobab'
import { render } from 'react-dom'
import { assign } from 'lodash'

let pageComponent
const tree = new Baobab(window.__TREE__)
const Component = React.createClass({
  propTypes: {
    tree: React.PropTypes.object.isRequired
  },
  getInitialState () {
    return tree.get()
  },
  componentDidMount () {
    tree.on('update', (e) => this.setState(tree.get()))
  },
  render () {
    return pageComponent({ tree })
  }
})

export default () => async (ctx, next) => {
  ctx.tree = tree
  ctx.render = (component, props) => {
    const combinedProps = assign({}, ctx.state, props, { tree })
    pageComponent = component
    render(
      React.createElement(Component, combinedProps),
      document.getElementById('layout')
    )
  }
  await next()
}
