import Router from 'koa-router'
const router = new Router()

router.get('/',async ctx=>{
    console.log('hello world')
    ctx.body = '欢迎使用vue-blog接口测试服务器'
})


export default router