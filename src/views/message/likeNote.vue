<template>
    <div class="root">
        <comment-card
            v-for="(item,index) in data"
            :key="index"
            theme="var(--color-theme)"
            :child-content="[{name:'点赞了 您的文章',content:item.title}]"
            :if-show-back-ground=false
        >
            <slot slot="userHead"><img :src="item.userHead" alt=""></slot>
            <slot slot="userName"><strong>{{item.name}}</strong></slot>
        </comment-card>
    </div>
</template>

<script>
import {getLikeNote} from "@/network/contentData";
import commentCard from "@/components/commentCard/commentCard";
export default {
    name: "likeNote",
    components:{
        commentCard
    },
    data(){
        return {
            data:[]
        }
    },
    methods:{

    },
    created() {
        getLikeNote().then(res =>{
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
