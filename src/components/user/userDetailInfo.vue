<template>
    <div class="root">
        <div class="follows">
            <strong class="number"><slot name="fans"></slot></strong>
            <strong>粉丝</strong>
        </div>
        <span><el-divider direction="vertical"></el-divider></span>
        <div class="care">
            <strong class="number"><slot name="followers"></slot></strong>
            <strong>关注</strong>
        </div>
        <span><el-divider direction="vertical"></el-divider></span>
        <div class="articles">
            <strong class="number"><slot name="articles"></slot></strong>
            <strong>笔记数</strong>
        </div>
    </div>
</template>

<script>
export default {
    name: "userDetail",

}
</script>

<style scoped>
    .root{
        display: flex;
        height: 6rem;
        border-bottom: 0.3rem solid rgb(230, 230, 230);
        border-top: 0.3rem solid rgb(230, 230, 230);
        text-align: center;
    }
    .root div:nth-child(1){
        flex: 1;
    }
    .root div:nth-child(3){
        flex: 1;
    }
    .root div:nth-child(5){
        flex: 1;
    }
    .number{
        color: var(--color-theme);

    }
    .el-divider--vertical{
        height: 5rem;
        margin-top: 0.5rem;
    }
</style>
