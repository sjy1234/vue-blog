import Router from 'koa-router'
import { base_API } from '../config'
// 引入我们登录注册的控制器
import UserController from '../Controller/UserController'
const router = new Router()
// 前端所有请求 发过来的时候都是这样的http://localhost:3000/api/...
router.get('/',async ctx=>{
    // console.log('hello world')
    ctx.body = '欢迎使用vue-blog接口测试服务器'
})
// 所有路由都写在这里就可以了
router.prefix(`${base_API}`)
// router.get('/index',async (ctx)=>{
//     ctx.body = '我是首页接口'
// })
// 登录
router.post('/login',UserController.login);
export default router