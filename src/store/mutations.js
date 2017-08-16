import * as types from './mutation-types'

export default {
  [types.UPDATE_CATEGORIES] (state, categories){
    state.categoryData = categories;
  },
  [types.UPDATE_RECORDS] (state, records){
    state.records = records;
  },
  [types.UPDATE_USER] (state, user){
    state.user = user;
  },
  [types.CLEAR_DATA] (state, user){
    state.records = [];
    state.categoryData = [];
  }
}
