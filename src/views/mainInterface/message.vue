<template>
    <div>
        <!-- 切换 -->
        <msg-type
            :word="word"
            :icon="icon"
            :word-color="'var(--color-theme)'"
            :is-active="nowIndex"
            @beClick="clickNavWord"
        ></msg-type>

        <!-- 展示收到的文章点赞，评论点赞，文章收到的评论，笔记收到的评论 -->
        <router-view />

        <div class="floatingButton">
            <i @click="routerChange" class="iconfont py-xuanzhuan"></i>
        </div>

        <tabbar :path="path" :isActive="message"></tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/tabbar/tabbar.vue'
import msgType from "@/components/message/msgType";
import msgNav from "@/components/message/msgNav";
export default {
    data() {
        return {
            message:'message',
            path: ['/home', '/share', '/message/commentNote', '/user'],
            word:[ '收到的评论','收到的赞',],
            icon:['py-talk','py-like',],
            nowIndex:0,
        }
    },
    watch:{
        // 假如用户点击了底栏中的message，那么应该切换一下nowIndex
        $route(to,from){
            if(to.path === '/message/commentNote'){
                this.nowIndex = 0
            }
        }
    },
    methods:{
        clickNavWord(index){
            if(index === 0){
                this.$router.replace('/message/commentNote')
            }else{
                this.$router.replace('/message/likeNote')
            }
            this.nowIndex = index
        },
        routerChange(){
            if(this.$route.path === '/message/likeNote'){
                this.$router.replace('/message/likeComment')
            } else if(this.$route.path === '/message/likeComment'){
                this.$router.replace('/message/likeNote')
            } else if(this.$route.path === '/message/commentNote'){
                this.$router.replace('/message/commentComment')
            } else if(this.$route.path === '/message/commentComment'){
                this.$router.replace('/message/commentNote')
            }
        },
    },
    components: {
        Tabbar,
        msgNav,
        msgType,
    }
}
</script>

<style scoped>
    .iconfont{
        font-size:3rem;
        color: #8c939d;
    }
    .floatingButton{
        width: 3rem;
        height: 3rem;
        position: fixed;
        bottom: 9rem;
        right: 1.5rem;
        text-align: center;
        line-height: 3rem;
        z-index: 10;
    }
    .floatingButton > i{
        font-size: 2.2rem;
        opacity: 60%;
        color: var(--color-theme);
    }
</style>
