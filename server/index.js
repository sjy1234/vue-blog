import koa from 'koa';
import cors from 'koa-cors'
import bodyparser from 'koa-bodyparser'
import router from './routes/index'
// 数据库连接文件
import query from './utils/query'
const app = new koa();
app.use(cors())
    .use(bodyparser())
    .use(router.routes())
app.listen(3000, () => {
    console.log('go')
})