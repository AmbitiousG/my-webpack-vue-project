import recordsService from '../api/records'
import userService from '../api/user'
import * as types from './mutation-types'
import Vue from 'vue'
import router from '../router'
import {logout} from '../utils/auth'

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
  register: ({commit}, {data, cb}) => {
    userService.register(data,
      res => {
        cb && cb(res);
      },
      () => {}
    );
  },
  logout: ({commit}, cb) => {
      logout();
      Vue.http.headers.common['Authorization'] = '';
      commit(types.UPDATE_USER, {});
      commit(types.CLEAR_DATA);
      cb && cb();
  },
  getCategories: ({ commit }, {alert, cb}) => {
    recordsService.getCategories(
      res => {
        if(res.errorCode == 1){
          alert.show({title: '请重新登录！', onHide: () => {
            router.push({name: 'Login'});
          }});
        }
        else {
          commit(types.UPDATE_CATEGORIES, res);
          cb && cb();
        }
      },
      () => {}
    )
  },
  getAllRecords: ({ commit }, {data, alert, cb}) => {
    recordsService.getRecords(
      data,
      res => {
        if(res.errorCode == 1){
          alert.show({title: '请重新登录！', onHide: () => {
            router.push({name: 'Login'});
          }});
        }
        else {
          commit(types.UPDATE_RECORDS, res)
        }
      },
      () => {}
    )
  },
  saveRecord: ({ commit }, {data, alert, cb}) => {
    recordsService.saveRecord(
      data,
      res => {
        if(res.errorCode == 1){
          alert.show({title: '请重新登录！', onHide: () => {
            router.push({name: 'Login'});
          }});
        }
        else {
          cb && cb(res);
        }
      },
      () => {}
    )
  },
  deleteRecord: ({commit, state}, {data, alert, cb}) => {
    recordsService.deleteRecord(
      data,
      res => {
        if(res.errorCode == 1){
          alert.show({title: '请重新登录！', onHide: () => {
            router.push({name: 'Login'});
          }});
        }
        else if(res.errorCode > 0){
          // alert.show()
        }
        else{
          var records = state.records.filter(record => record.RecordID != data.recordID);
          commit(types.UPDATE_RECORDS, records);
          cb && cb(res);
        }
      }
    )
  }
};
