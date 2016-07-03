import { view, dom } from 'view'
import { deepOcean, centerOfParent, type, softGray } from 'style'
import { droppable, dndable, draglayer } from 'components/dndable'
import toolbar from './toolbar'
import * as editors from './editors'

const { div, span } = dom

const styles = {
  container: [centerOfParent(), {
    width: '100%',
    height: '400px',
    position: 'absolute'
  }],
  cta: [type('mediumHeader'), {
    width: '100%',
    height: '100%',
    position: 'absolute',
    textAlign: 'center',
    lineHeight: '400px',
    border: `3px dashed ${softGray}`,
    color: softGray
  }],
  text: {
    textAlign: 'center',
    color: deepOcean,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  bgColor: (background) => ({
    backgroundColor: background.get('color'),
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  })
}

export default view((_, { tree }) => {
  const background = tree.select('campaign').select('background')
  const backgroundEl = background.get()
    ? div({ style: styles.bgColor(background) })
    : droppable({ type: 'toolbaritem' })(({ connectDropTarget }) =>
        connectDropTarget(
          div({ style: styles.cta },
            span({ style: styles.text },
              'Drag and drop an image, video or color block to begin'))))
  return dndable({},
      draglayer({})(({ itemType, currentOffset }) => {
        if (itemType === 'editor') {
          return editors.colorBlockPreview(currentOffset)
        }
        return null
      }),
      toolbar({}),
      tree.get('editor') && {
        color: editors.colorBlock({})
      }[tree.get('editor').type],
      div({ style: styles.container }, backgroundEl))
})
