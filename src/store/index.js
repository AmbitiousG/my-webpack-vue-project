import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import {
  getUserFromToken
}
from '../utils/auth'

Vue.use(Vuex)
var user = getUserFromToken();

const state = {
  user: user || {},
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
    },
    user: state => {
      return state.user;
    }
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    },
    UPDATE_DIRECTION(state, direction) {
      state.direction = direction
    },
    ...mutations
  },
  actions: {
    updateRecords({
      commit
    }, records) {
      commit('UPDATE_RECORDS', records);
    },
    ...actions
  }
})
