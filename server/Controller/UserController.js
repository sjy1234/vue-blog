// const login = async (ctx)=>{

// }
// export default {
//     login,
// }
// 这是以前我们的写法，通常我们会把处理过程写成函数，直接暴露函数即可
// 以后，我们在写方法的时候，直接调用ES6 class类

class UserController {
    // 登录的处理逻辑
        /** 
         * 1.验证用户名/密码是否合法
         * 2.检查用户名是否存在
         * 3.生成token
         * 4.最后返回token
         * */ 
    async login(ctx) {

    }
}

export default new UserController()