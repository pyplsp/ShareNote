<template>
    <div class="root">
        <note-card
            v-for="(item,index) in articleData"
            :key="index"
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
        <div class="checkMore">
            <span>为保护用户隐私，最多只显示 5 条数据 ~</span>
        </div>
    </div>
</template>

<script>
import noteCard from "@/components/noteCard/noteCard";
import {getFiveShareNotes} from '@/network/contentData'
export default {
    name: "myArticle",
    data(){
        return {
            articleData:{},

        }
    },
    methods:{

    },
    created(){
        getFiveShareNotes(this.$route.query.id).then(res => {
            this.articleData = res.data.data
        })
    },
    components:{
        noteCard,
    },
}
</script>

<style scoped>
    .root{
        margin: 0 auto;
        width: 91%;
    }
    .checkMore{
        margin: 1rem 0 1rem;
        text-align: center;
        font-size: 0.6rem;
        color: rgb(152, 162, 170);
    }
</style>
