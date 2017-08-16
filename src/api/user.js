import Vue from 'vue'

export default {
  login: (userInfo, cb, errorCb) => {
    Vue.http.post('/login/login', userInfo).then(response => {
      let res = response.body;
      if(!res.error){
        localStorage.setItem('token', res.token);
        Vue.http.headers.common['Authorization'] = 'Bearer ' + res.token;
      }
      cb(res);
    }, response => {
      errorCb();
    })
  },
  register: (userInfo, cb, errorCb) => {
    Vue.http.post('/login/register', userInfo).then(response => {
      let res = response.body;
      cb(res);
    }, response => {
      errorCb();
    })
  }
}
