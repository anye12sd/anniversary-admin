import Router from 'vue-router'

const Index = () => import(/* webpackChunkName: "Index" */ '@/views/Index.vue')

export default new Router({
    routes: [
        // {
        //     path: "/",
        //     name: "Login",
        //     component: Login,
        //     meta: {
        //         title: "登录后台管理系统"
        //     }
        // },
        {
            path: "/views/index",
            name: "Index",
            component: Index,
            meta: {
                title: "首页"
            }
        },
    ]
})
