const mutations = {
    // 全局方法 改变token 和 token 的两个方法
    SET_TOKEN:(state,token)=>{
        state.token = token
    },
    SET_NAME:(state,username)=>{
        state.username = username
    }
}


export default mutations