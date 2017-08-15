import Vue from 'vue'

export default {
  login: (userInfo, cb, errorCb) => {
    Vue.http.post('/login/login', userInfo).then(response => {
      // debugger;
      let res = response.body;
      localStorage.setItem('token', res.token);
      Vue.http.headers.common['Authorization'] = 'Bearer ' + res.token;
      cb(res);
    }, response => {
      errorCb();
    })
  }
}
