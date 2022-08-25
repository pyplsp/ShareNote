<template>
    <div class="root" @click="beClick" :style="{backgroundColor:backgroundColor}">
        <div>
            <!-- 说明图标 -->
            <div :style="{fontSize: '2rem',marginRight: '1rem',color: data[2]}"><span v-html="data[1]" ></span></div>
            <!-- 文字 -->
            <div><span>{{data[0]}}</span></div>
        </div>
        <!-- 前景图标 -->
        <div><i class="el-icon-arrow-right"></i></div>
    </div>
</template>

<script>
export default {
    name: "settingItem",
    props:['data','backgroundColor','index'],
    methods:{
        beClick(){
            this.$emit('beClick',this.index)
        }
    }
}
</script>

<style scoped>
    .root{
        height: 4rem;
        line-height: 4rem;
        display: flex;
    }
    .root >div:nth-child(1){
        flex: 7;
        padding-left: 2rem;
        font-weight: 1000;
        display: flex;
    }
    .root > div:nth-child(2){
        flex: 1;
        text-align: right;
        padding-right: 2rem;
    }
</style>
