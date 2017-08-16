import Vue from 'vue'
import router from '../router'

export default {
  getCategories: (cb, errorCb) => {
    Vue.http.post('api/getCategories').then(response => {
      let res = response.body;

      if (res.errorCode == 1) {
        router.push({
          name: 'Login'
        });
        return;
      }
      if (res.Categories && res.Categories.length > 0) {
        cb(_.map(res.Categories, c => {
          return {
            name: c.CategoryName,
            value: c.CategoryID.toString()
          }
        }));
      }
      else {
        errorCb && errorCb();
      }
    })
  },
  getRecords: (data, cb, errorCb) => {
    Vue.http.post('/api/getList').then(response => {
      let res = response.body;

      if (res.errorCode == 1) {
        router.push({
          name: 'Login'
        });
        return;
      }
      cb(res.Records);
    }, response => {
      errorCb();
    })
  },
  saveRecord: (data, cb, errorCb) => {
    Vue.http.post('/api/save', data).then(response => {
      let res = response.body;

      if (res.errorCode == 1) {
        router.push({
          name: 'Login'
        });
        return;
      }
      cb && cb(res);
    }, response => {
      errorCb && errorCb();
    })
  }
}
