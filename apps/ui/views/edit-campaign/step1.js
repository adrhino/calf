import { flatInput, flatLabel } from 'style'
import { view, dom } from 'view'
import { updateAttr } from '../../controllers/campaigns'
import { capitalize, snakeCase, assign } from 'lodash'
import moment from 'moment'

const { div, label, input } = dom

const styles = {
  form: {
    maxWidth: '500px',
    margin: 'auto',
    position: 'relative'
  },
  label: flatLabel({
    marginBottom: '10px'
  }),
  input: flatInput({
    display: 'block',
    marginTop: '5px',
    width: '100%'
  }),
  startEnd: {
    width: '50%',
    display: 'inline-block'
  }
}

export default view(({ campaign }) => {
  const inputField = (attr, placeholder, ...inputStyles) => (
    label({
      style: assign({}, styles.label, ...inputStyles),
      key: attr
    }, capitalize(snakeCase(attr).split('_').join(' ')),
      input({
        key: attr,
        style: styles.input,
        placeholder: placeholder,
        className: attr === 'name' ? 'foobarbaz' : null,
        onChange: updateAttr(campaign, attr),
        defaultValue: attr === 'startAt' || attr === 'endAt'
          ? moment(campaign.get(attr)).format('MM/DD/YYYY')
          : campaign.get(attr)
      }))
  )
  return div({ style: styles.form },
    inputField('name', "e.g. Tiffany's Winter Sale"),
    inputField('startAt', 'e.g. 10/14/20',
      styles.startEnd, { paddingRight: '10px' }),
    inputField('endAt', 'e.g. 10/14/20',
      styles.startEnd, { paddingLeft: '10px' }))
})
