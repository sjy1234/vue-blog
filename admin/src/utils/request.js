import axios from 'axios'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import { getToken,removeToken} from '@/utils/auth'
import Vue from 'vue'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL:"http://localhost:3000/api",
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response =>{
    const res = response.data
    if (res.code === 40001) {
      // token已过期的验证码
      alert('token已过期');
      removeToken()
      store.commit('SET_TOKEN')
      location.reload()
    }else{
      //这里面可以设置自定义的返回错误
      return response.data
    }
  },
  error => {
    // 服务器报出来所有错误，都会被前段接受到这个位置，这个位置会打印这些错误信息，方便调试
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
