/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import router from '@/router'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)

// 创建axios实例
var instance = axios.create({
    timeout: 1000 * 12
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    // 清除用户登录信息
    // localStorage.removeItem('token')
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}
// 请求拦截器
instance.interceptors.request.use((config) => {
    console.log(config)
    const token = localStorage.getItem('token') || ''
    config.headers['token'] = token
    return config
},
error => {
    console.log(error)
    return Promise.reject(error)
})
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status:any, other:any) => {
    console.log(status)
    // 状态码判断
    switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
        Toast(other)
        toLogin()
        break
        // 403 token过期
        // 清除token并跳转登录页
    case 403:
        setTimeout(() => {
            toLogin()
        },
        1000)
        break
        // 404请求不存在
    case 404:
        break
    default:
        console.log(other)
    }
}
// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    error => {
        const {
            response
        } = error
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        } else {
            // 处理断网的情况
            console.log('断网了')
            return Promise.reject(response)
        }
    })

export
default instance
