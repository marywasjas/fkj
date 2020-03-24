import axios from 'axios'
axios.defaults.withCredentials = true
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30 * 1000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  const villageId = window.localStorage.getItem('villageId')
  if (villageId) {
    config.headers['token'] = villageId // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 500) {
      Message({
        message: response.msg || '系统错误！',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return res
    }
  },
  error => {
    if (error.message === 'Network Error') error.message = '未知错误！请联系管理员。'
    Message({
      message: error.message,
      type: 'error',
      duration: 8 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
