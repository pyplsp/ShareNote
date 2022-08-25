<template>
    <div class="root">
        <comment-card class="card"
                      v-for="(item,index) in data"
                      theme="var(--color-theme)"
                      :child-content="[{name:myName,content:item.pcontent}]"
        >
            <slot slot="userHead"><img :src="item.userHead" alt=""></slot>
            <slot slot="userName"><strong>{{item.name}}</strong></slot>
            <slot slot="createTime"><i class="el-icon-s-order"></i> {{item.title}}</slot>
            <slot slot="content">{{item.ccontent}}</slot>
        </comment-card>
    </div>
</template>

<script>
import commentCard from "@/components/commentCard/commentCard";
import {getCommentComment} from "@/network/contentData";
export default {
    name: "commentComment",
    data(){
        return {
            data:[]
        }
    },
    components:{
        commentCard
    },
    computed:{
        myName(){
            return localStorage.getItem('name')
        }
    },
    methods:{

    },
    created() {
        getCommentComment().then(res =>{
            this.data = res.data.data
        })
    },
}
</script>

<style scoped>
    .root{
        padding-bottom: 4rem;
    }
    img{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }
</style>
