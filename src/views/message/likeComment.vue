<template>
    <div class="root">
        <comment-card
            v-for="(item,index) in data"
            :key="index"
            theme="var(--color-theme)"
            :child-content="[{name:'点赞了您的评论',content:item.content}]"
            :if-show-back-ground=false
        >
            <slot slot="userHead"><img :src="item.userHead" alt=""></slot>
            <slot slot="userName"><strong>{{item.name}}</strong></slot>
            <slot slot="createTime"><i class="el-icon-s-order"></i> {{item.title}}</slot>
        </comment-card>
    </div>
</template>

<script>
import commentCard from "@/components/commentCard/commentCard";
import {getLikeComment} from "@/network/contentData";
export default {
    name: "likeComment",
    components:{
        commentCard
    },
    data(){
        return {
            data:[],
        }
    },
    methods:{

    },
    created() {
        getLikeComment().then(res => {
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
