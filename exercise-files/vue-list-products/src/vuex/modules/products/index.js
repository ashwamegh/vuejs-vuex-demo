import initialState from './initialState'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

export default {
  state: { ...initialState },
  getters,
  mutations,
  actions
}