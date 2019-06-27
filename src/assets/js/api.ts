import axios from '@/assets/js/http' // 导入http中创建的axios实例
// const $HTTPURL = 'testapi' // 测试地址
const $HTTPURL = 'api' // 正式地址

const base = {
    // 登录
    signIn: '/' + $HTTPURL + '/user/login',
    // 获取列表
    queryAccount: `/${$HTTPURL}/account/get-accountlist`,
    // 增加单据
    addAccount: `/${$HTTPURL}/account/add-account`,
    // 修改组织
    editOrg: '/api/org/update',
    // 删除组织
    delOrg: '/api/org/delete',
    // 获取类型列表
    queryType: `/${$HTTPURL}/type/get-typelist`
}
// 登录
const login = {
    signIn: (params:any) => { return axios.post(`${base.signIn}`, params) }
}
// 账单
const account = {
    query: (params:any) => { return axios.get(`${base.queryAccount}`, { params: params }) },
    add: (params:any) => { return axios.post(`${base.addAccount}`, params) },
    edit: (params:any) => { return axios.put(`${base.editOrg}`, params) },
    del: (params:any) => { return axios.delete(`${base.delOrg}/${params}`) }
}
// 类型
const type = {
    query: (params:any) => { return axios.get(`${base.queryType}`, { params: params }) }
}

export default {
    login,
    account,
    type
}
