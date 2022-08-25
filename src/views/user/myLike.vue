<template>
    <div>
        <child-nav>
            <i @click="goToUser" slot="icon" class="el-icon-arrow-left"></i>
            <span slot="title">点赞过的笔记</span>
        </child-nav>

        <div class="content">
            <note-card
                v-for="(item,index) in allArticle"
                :key="index"
                @goGoGo="goToShareDetail(item.noteId)"
            >
                <img style="width: 100%;height:100%;border-radius: 20%"
                     slot="image"
                     :src="item.noteImage"
                     alt="图片无法显示">
                <span slot="name">{{item.name}}</span>
                <span slot="createTime">{{item.upTime ? item.upTime.split("T")[0] : ''}}</span>
                <span slot="title">{{item.title}}</span>
                <span slot="content">{{item.content}}</span>
            </note-card>
        </div>

    </div>
</template>

<script>
import childNav from "@/components/user/childNav";
import noteCard from "@/components/noteCard/noteCard";
import {userLike} from '@/network/contentData'
export default {
    name: "myLike",
    data(){
        return{
            allArticle:[],
        }
    },
    methods:{
        goToUser() {
            this.$router.back()
        },
        goToShareDetail(id){
            this.$router.push({
                path:'/shareNote',
                query:{
                    id:id
                }
            })
        },
    },
    components:{
        childNav,
        noteCard
    },
    created() {
        userLike().then(res =>{
            this.allArticle = res.data.data
        })
    }
}
</script>

<style scoped>
    .content{
        width: 90%;
        margin: 4rem auto 0;
    }
</style>
