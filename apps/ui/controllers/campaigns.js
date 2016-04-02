import api from 'api'
import page from 'page'
import dashboard from '../views/dashboard'
import newCampaign from '../views/campaigns/new'

let indexRoute = async (ctx, next) => {
  let res = await api(`{
    campaigns {
      _id
      name
      userId
    }
  }`)
  let data = await res.json()
  if (!ctx.tree.get('campaigns')) {
    ctx.tree.set('campaigns', data.data.campaigns)
  }
  ctx.render(dashboard)
}

let newRoute = (ctx) => {
  ctx.render(newCampaign)
}

let addCampaign = () => {
  page('/campaigns/new')
}

let newCampaignNext = (step) => {
  step.set(step + 1)
}

export { addCampaign, indexRoute, newRoute, newCampaignNext }
