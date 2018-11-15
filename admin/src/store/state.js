import { getToken,setToken,removeToken } from '@/utils/auth'
const state = {
    // 全局变量

    token:getToken(),//登录凭证
    username:'',
    id:'',// 
    title:'',//
    tags:'',//
    comment:'',// 编辑文章的内容
    isPublished:'',//文章是否发布
    toggleDelete:false
}

export default state