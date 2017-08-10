import recordsService from '../api/records'
import * as types from './mutation-types'

export default {
  getCategories: ({ commit }, cb) => {
    recordsService.getCategories(
      categoryData => {
        commit(types.UPDATE_CATEGORIES, categoryData);
        cb && cb();
      },
      () => {}
    )
  },
  getAllRecords: ({ commit }, data) => {
    recordsService.getRecords(
      data,
      records => commit(types.UPDATE_RECORDS, records),
      () => {}
    )
  },
  saveRecord: ({ commit }, {data, cb}) => {
    recordsService.saveRecord(
      data,
      res => {
        cb && cb(res);
      },
      () => {}
    )
  }
};
