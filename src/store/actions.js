import recordsService from '../api/records'
import userService from '../api/user'
import * as types from './mutation-types'
import Vue from 'vue'

export default {
  login: ({commit}, {data, cb}) => {
    userService.login(data,
      res => {
        if(!res.error)
          commit(types.UPDATE_USER, res)
        cb && cb(res);
      },
      () => {}
    );
  },
  logout: ({commit}, cb) => {
      localStorage.clear();
      Vue.http.headers.common['Authorization'] = '';
      commit(types.UPDATE_USER, {});
      cb && cb();
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
