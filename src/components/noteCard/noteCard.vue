<template>
    <div @click="goGo">
        <el-card shadow="never">
            <div class="image">
                <slot name="image"></slot>
            </div>
            <div class="titleAndIntroduction">
                <div class="nameAndTime">
                    <slot name="name"></slot>
                    <slot name="createTime"></slot>
                </div>
                <div class="title">
                    <strong><slot name="title"></slot></strong>
                </div>
                <div class="introdution">
                    <slot name="content"></slot>
                    <strong v-show="isShowPoint">...</strong>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "noteCard",
    methods:{
        goGo() {
            this.$emit('goGoGo')
        }
    },
    props:{
        isShowPoint:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style scoped>
    ::v-deep .el-card__body {
        height: 5rem;
        display: flex;
        padding: 0.9rem;
    }
    ::v-deep .el-card{
        border: none;
        border-bottom: 1px solid #EBEEF5;
    }
    .image{
        width: 30%;
        height: 100%;
        display: block;
        margin-right: 0.5rem;
        border-radius: 20%;
    }
    .titleAndIntroduction{
        width: 70%;
        height: 100%;
    }
    .nameAndTime{
        height: 20%;
        font-size: 0.5rem;
        display: flex;
    }
    .nameAndTime > span:first-child{
        display: inline-block;
        flex: 1;
    }
    .nameAndTime > span:last-child{
        display: inline-block;
    }
    .title{
        height: 30%;
        margin: 0.2rem 0 0.2rem;
    }
    .introdution{
        height: 50%;
        font-size: 0.5rem;
    }
</style>
