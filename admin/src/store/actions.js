// 封装的请求request
import request from '@/utils/request'
// 
const actions = {

    async saveArticle ({commit,state},{id,title,tags,content,isPublished}){
        request({
            method:'post',
            url:`/articles/update/${id}`,
            data:{
                title,
                tags,
                content,
                isPublished
            }
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        commit('SET_CURRENT_ARTICLE',{id,title,tags,content,isPublished})
    },
}


export default actions