import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  user: {},
  isLoading: false,
  direction: 'forward',
  records: [],
  categoryData: []
}
export default new Vuex.Store({
  state,
  getters: {
    categoryData: state => {
      return state.categoryData;
    },
    records: state => {
      return state.records;
    }
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading;
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    ...mutations
  },
  actions: {
    updateRecords({commit}, records) {
      commit('UPDATE_RECORDS', records);
    },
    ...actions
  }
})
