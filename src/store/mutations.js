import * as types from './mutation-types'

export default {
  [types.UPDATE_CATEGORIES] (state, categories){
    state.categoryData = categories;
  },
  [types.UPDATE_RECORDS] (state, records){
    state.records = records;
  }
}
