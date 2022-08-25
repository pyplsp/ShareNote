<template>
    <div class="root" :style="{color:wordColor}">
        <div class="title">
            消 息
        </div>
        <div class="change">
            <div v-for="(item,index) in word"
                 :style="{borderBottom:isActive === index?'solid 4px '+wordColor:'none'}"
            >
                <span @click="itemClick(index)">
                    {{item}}
                    <i v-if="icon[index]" class="iconfont" :class="[icon[index]]"></i>
                </span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "msgType",
    props:{
        word:{type:Array},
        icon:{type:Array},
        wordColor:{type:String},
        isActive:{
            type:Number,
        },
    },
    methods:{
        itemClick(index){
            this.$emit('beClick',index)
        },
    },
}
</script>

<style scoped>
    .root{
        height: 10rem;
        padding-bottom: 1rem;
        background-color: #f6efef;
        border-bottom: 1px solid #e6e6e6;
    }
    .title{
        margin: 0 auto;
        width: 90%;
        padding: 2.5rem 0 2.5rem;
        font-size: 2rem;
        font-weight: 900;
    }
    .change {
        margin: 0 auto ;
        width: 70%;
        height: 2.6rem;
        line-height: 2.6rem;
        display: flex;
        text-align: center;
        font-weight: 900;
    }
    .change > div{
        flex: 1;
        margin: 0 1.5rem;
        white-space:nowrap;
    }
</style>
