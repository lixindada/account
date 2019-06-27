import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/assets/js/api' // 导入api接口
import Vant from 'vant'
import 'vant/lib/index.css'
import './registerServiceWorker'
import './assets/js/windowSize'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.aaa = 1
Vue.prototype.$api = api // 将api挂载到vue的原型上

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
