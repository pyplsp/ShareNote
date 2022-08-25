import Vue from 'vue'
import VueRouter from 'vue-router'
import {refresh} from "@/network/verify";
import {myStore} from '@/store'
const store = myStore();

Vue.use(VueRouter)

const routes = [
    // 重定向
    {
        path: '/',
        redirect: '/home',
    },

    // 主要界面的四个导航
    {
        path: '/home',
        component: () => import('@/views/mainInterface/home.vue'),
        meta:{
            keepAlive: true
        }
    },
    {
        path: '/share',
        component: () => import('@/views/mainInterface/share.vue'),
        meta:{
            keepAlive: true
        }
    },
    {
        path: '/message',
        redirect: '/message/commentNote',
        component: () => import('@/views/mainInterface/message.vue'),
        meta:{
            keepAlive: true
        },
        children: [
            {
                path:'likeNote',
                component:() => import('@/views/message/likeNote')
            },
            {
                path:'likeComment',
                component:() => import('@/views/message/likeComment')
            },
            {
                path:'commentNote',
                component:() => import('@/views/message/commentNote')
            },
            {
                path:'commentComment',
                component:() => import('@/views/message/commentComment')
            }
        ]
    },
    {
        path: '/user',
        component: () => import('@/views/mainInterface/user.vue'),
        meta:{
            keepAlive: true
        }
    },

    // 文章 详情/阅读 界面
    {
        path: '/note',
        component: () => import('@/views/noteDetails/localNote')
    },

    // 登录与注册
    {
        path: '/login',
        component: () => import('@/views/verify/login')
    },
    {
        path: '/register',
        component: () => import('@/views/verify/register')
    },

    // 新建的笔记
    {
        path: '/newNote',
        component: () => import('@/views/noteDetails/newNote')
    },

    // 由分享页进去的详情页
    {
        path:'/shareNote',
        component:() => import('@/views/noteDetails/shareNote')
    },
    // 编辑用户的个人信息
    {
        path:'/editor',
        component:() => import('@/views/user/editorUser')
    },
    // 收藏页面
    {
        path:'/collection',
        component:() => import('@/views/user/collect')
    },
    // 我的分区界面
    {
        path:'/myArea',
        component:() => import('@/views/user/myArea')
    },
    // 我点赞过的文章界面
    {
        path:'/myLike',
        component:() => import('@/views/user/myLike')
    },
    // 反馈界面
    {
        path:'/feedBack',
        component:() => import('@/views/user/feedBack')
    },
    // 用户个人详情页（指每个用户的详情，展示大量东西）
    {
        path:'/userInfo',
        component:() => import('@/views/user/eachUserInfo'),
        redirect: '/userInfo/article',
        children:[
            {
                path:'article',
                component:() => import('@/views/user/eachUserInfoChild/myArticle')
            },
            {
                path:'like',
                component:() => import('@/views/user/eachUserInfoChild/hadLike')
            },
            {
                path:'collect',
                component:() => import('@/views/user/eachUserInfoChild/hadCollect')
            }
        ]
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash'
})


router.beforeEach((to, from, next)=>{
    if (to.path === '/login' || to.path === '/register'){
        next();
    }
    else if(localStorage.getItem('token') === null){
        next('/login')
    }
    else{
        if(store.state.verify === false){
            refresh().then(res =>{
                localStorage.setItem('token',res.data.data.token)
                next()
                store.commit('changeVerify')
            }).catch(() =>{
                // token过期，跳转到 login 界面
                next('/login')
            })
        }else{
            next()
        }
    }
})


export default router
