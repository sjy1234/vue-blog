import jwt from 'jsonwebtoken'
import { secret } from '../config'

export default async function ( ctx, next )  {
  const XToken = ctx.get('X-Token');
  if (XToken === '') {
    // ctx.throw(401, "no token detected in http header 'X-Token'");
    ctx.body = {
      code:40001,
      message:"请求头里面没有对应信息"
    }
  }
  let tokenContent;
  try {
    tokenContent = await jwt.verify(XToken, secret);     //如果token过期或验证失败，将抛出错误   
    await next();
  }catch(err){
    console.log(err)
    // ctx.throw(401, 'invalid token');
    if (err.message == 'jwt expired') {
      ctx.body = {
        code:40001,
        message:'token已过期，请重新登录'
      }
    }else {
      console.log(err)
      ctx.throw(500) // 直接抛出500错误
      // 抛给前端request拦截器
    }
  }
}