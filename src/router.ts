import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/Home.vue'),
            children: [
                {
                    path: '/',
                    name: 'index',
                    component: () => import('./components/index.vue')
                },
                {
                    path: '/summary',
                    name: 'summary',
                    component: () => import('./components/summary.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./components/login.vue')
        },
        {
            path: '/addAccount',
            name: 'addAccount',
            component: () => import('./components/addAccount.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
