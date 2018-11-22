import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 引入登录组件
import Login from '@/components/Login'
// 引入主页面组件
import List from '@/components/List'
import About from '@/components/About'
import ReadingList from '@/components/ReadingList'
import Tag from '@/components/Tag'
export default new Router({
  routes: [
    { 
      path:'/login',component:Login
    },
    {
      path:'/list',component:List
    },
    {
      path:'*',redirect:'/login'
    },
    {
      path:'/about',component:About
    },
    {
      path:'/ReadingList',component:ReadingList
    },
    {
      path:'/tag',component:Tag
    }
  ]
})
