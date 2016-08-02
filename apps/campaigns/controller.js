import api from 'api'
import tree from 'universal-tree'

export const state = tree({
  campaigns: [],
  campaign: null
})

export const indexRoute = async (ctx, next) => {
  const data = await ctx.bootstrap(() =>
    api('{ campaigns { _id name startAt endAt channels regions } }')
  )
  state.set({ campaigns: data.campaigns })
  next()
}
