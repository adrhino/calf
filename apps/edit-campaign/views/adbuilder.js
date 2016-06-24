import { view, dom } from 'view'
import {
  darkSlate, smallMargin, deepOcean, headerHeight, centerOfParent, type,
  softGray
} from 'style'
import { draggable, droppable, dndable } from 'components/dndable'

const { nav, button, div, span } = dom

const styles = {
  toolbar: {
    position: 'absolute',
    top: smallMargin,
    left: smallMargin,
    backgroundColor: deepOcean,
    zIndex: 2
  },
  toolbarIcon: {
    borderBottom: `1px solid ${darkSlate}`,
    padding: `${smallMargin}px`,
    color: 'white',
    display: 'block',
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: '-webkit-grab',
    outline: 'none'
  },
  cta: [type('mediumHeader'), centerOfParent(), {
    width: '100%',
    height: '400px',
    textAlign: 'center',
    lineHeight: '400px',
    border: `3px dashed ${softGray}`,
    color: softGray,
    marginTop: `-${headerHeight}px`
  }],
  text: {
    textAlign: 'center',
    color: deepOcean,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
}

export default view((props) => (
  dndable({},
    nav({ style: styles.toolbar },
      ['T', 'B', 'V', 'I', 'P', 'S', 'C'].map((char) =>
        draggable({ key: 'dndable' },
          button({ style: styles.toolbarIcon }, char)))),
    droppable({ key: 'dndable' },
      div({ style: styles.cta },
        span({ style: styles.text },
          'Drag and drop an image, video or color block to begin'))))
))
