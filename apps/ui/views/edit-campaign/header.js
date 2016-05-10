import { editCampaignNext, editCampaignPrev } from '../../controllers/campaigns'
import {
  headerHeight, flatButton, type, smallMargin, deepOcean, darkSlate, softGray
} from 'style'
import { view, dom } from 'view'
import logo from '../layout/logo'
import arrow from './arrow'

const { h1, nav, div, button, a, header } = dom
const navPadding = 18

const styles = {
  header: {
    width: '100%',
    height: `${headerHeight}px`,
    backgroundColor: 'white',
    borderBottom: `1px solid ${softGray}`,
    color: deepOcean,
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  nav: {
    fontWeight: 'bold',
    position: 'relative',
    padding: `${navPadding} 0`
  },
  navA: (highlighted) => [
    type('label'),
    {
      paddingRight: smallMargin,
      color: highlighted ? darkSlate : softGray,
      transition: 'color 0.2s ease-in-out'
    }
  ],
  buttons: {
    position: 'absolute',
    right: '15px',
    top: '9px'
  },
  prev: flatButton('light', {
    borderColor: 'transparent',
    color: softGray
  }),
  next: (enabled) => flatButton(enabled ? 'hot' : 'darkDisabled'),
  h1: [
    type('label'),
    {
      position: 'absolute',
      left: '150px',
      top: `${navPadding}px`,
      borderLeft: `1px solid ${darkSlate}`,
      paddingLeft: '15px',
      color: darkSlate
    }
  ]
}

export default view((_, { tree }) => {
  const editCampaignStep = tree.select('editCampaignStep')
  return header({ style: styles.header },
    logo(),
    h1({ style: styles.h1 }, 'Building an ad campaign'),
    nav({ style: styles.nav },
      ['Details', 'Assets', 'Targeting', 'Review'].map((label, i) => (
        a({
          style: styles.navA(editCampaignStep.get() === i),
          key: i
        }, `${i + 1}. ${label}`)
      ))),
    div({ style: styles.buttons },
      button({
        style: styles.prev,
        onClick: () => editCampaignPrev(tree),
        key: 'prev'
      }, arrow({ dir: 'left' }), 'Previous'),
      button({
        style: styles.next(tree.get('enableNextStep')),
        onClick: () => editCampaignNext(tree),
        key: 'next'
      }, 'Next', arrow({ fill: tree.get('enableNextStep') ? 'white' : '' }))))
})
