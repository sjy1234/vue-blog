import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

// 创建白名单 那些页面不需要权限
const whiteList = ['/login']
// 设置页面跳转之前的权限判断操作
// to 即将跳转的页面
router.beforeEach((to,from,next)=>{
    // 开启进度条
    NProgress.start();
    if (getToken()) {
        // 如果有token值
        if (to.path === '/login') {
            next({path:'/list'})
            NProgress.done();  // 进度条结束
        }else {
            next()  // 正常进行页面跳转
        }
    }else {
        // 没有token的情况
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        }else{
            // 不在白名单里面，也没有token值
            next({ path:'/login' })
            NProgress.done()
        }
    }
    
})
router.afterEach(()=>{
    NProgress.done();      
})