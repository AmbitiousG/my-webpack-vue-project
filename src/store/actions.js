import recordsService from '../api/records'
import userService from '../api/user'
import * as types from './mutation-types'
import Vue from 'vue'

export default {
  login: ({commit}, {data, cb}) => {
    userService.login(data,
      res => {
        cb && cb(res);
      },
      () => {}
    );
  },
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
