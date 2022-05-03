import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

// 粒子插件
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

import axios from 'axios'      
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:5000/'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
axios.interceptors.response.use(config => {
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
