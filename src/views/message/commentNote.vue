<template>
    <div class="root">
        <comment-card class="card"
            v-for="(item,index) in data"
            theme="var(--color-theme)"
            :child-content="[{name:'发表评论',content:item.content}]"
            :if-show-back-ground=false
        >
            <slot slot="userHead"><img :src="item.userHead" alt=""></slot>
            <slot slot="userName"><strong>{{item.name}}</strong></slot>
            <slot slot="createTime"><i class="el-icon-s-order"></i> {{item.title}}</slot>
        </comment-card>

    </div>
</template>

<script>
import {getCommentNote} from "@/network/contentData";
import commentCard from "@/components/commentCard/commentCard";
export default {
    name: "commentNote",
    components: {commentCard},
    data(){
        return {
            data:[]
        }
    },
    methods:{

    },
    created() {
        getCommentNote().then(res => {
            this.data = res.data.data
        })
    },
}
</script>

<style scoped>
    img{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }
    .root{
        padding-bottom: 4rem;
    }
</style>
