<template>
    <div id="app">
        <keep-alive v-if="isLoggedIn">
            <router-view v-if="isRouterAlive && $route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="(isRouterAlive && !$route.meta.keepAlive) || !isLoggedIn"></router-view>
    </div>
</template>

<script>
export default {
    provide(){
        return {
            reload:this.reload,

        }
    },
    data(){
        return{
            isLoggedIn: false,
            isRouterAlive:true,
            active:['home','share','message','user']
        }
    },
    methods:{
        reload(){
            this.isRouterAlive = false
            this.$nextTick(function (){
                this.isRouterAlive = true
            })
        }
    },
    watch: {
        $route(to, from) {
            // let token = localStorage.getItem("token") || "";
            // if (token) {
            //     this.isLoggedIn = true;
            // } else {
            //     this.isLoggedIn = false;
            // }
            this.isLoggedIn = to.path !== '/login';
        },
    },
}

</script>

<style scoped>
    @import url('assets/css/base.css');
</style>
