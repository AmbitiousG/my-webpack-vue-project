import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward'
}
export default new Vuex.Store({
  state,
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading;
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    }
  }
})
