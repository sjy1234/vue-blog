// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 将状态管理的文件引入进来
import store from '@/store'
// 将图标库的js文件引入进来
import "@/assets/image/icon/iconfont"
// import '@/assets/style/index'
// 将全局的样式引入进来
import '@/assets/style'
// 如果以后做项目，vue里面所有的插件都是在main文件夹中引入的
import VeeValidate from 'vee-validate'
// 我们在这里引入一个消息提示的插件，用来对用户进行合法性验证
import Notifications from 'vue-notification'
import '@/permission'
Vue.use(VeeValidate)
Vue.use(Notifications)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
