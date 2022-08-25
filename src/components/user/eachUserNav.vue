<template>
    <div class="root" :style="{color:theFontColor}">
        <div v-for="(it,index) in item"
             :style="{borderBottom:nowIndex === index ?'3px solid '+theFontColor : 'none'}"
        >
            <span @click="clickItem(index)">
                {{it}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "eachUserNav",
    data(){
        return{
            nowIndex:0,
        }
    },
    props:{
        item:{type:Array},
        theFontColor:{
            type:String,
        }
    },
    methods:{
        clickItem(index){
            this.nowIndex = index
            this.$emit('clickTheItem',index)
        }
    }
}
</script>

<style scoped>
    .root{
        height: 3rem;
        display: flex;
        width: 90%;
        margin: 0 auto;
        text-align: center;
        line-height: 3rem;
        font-weight: 900;
        background-color: white;
    }
    .root > div{
        flex: 1;
    }
</style>
