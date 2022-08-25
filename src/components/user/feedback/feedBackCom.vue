<template>
    <el-card class="card">
        <div class="author">
            <div class="iamge">
                <slot name="iamge"></slot>
            </div>
            <div class="content">
                <div class="name">
                    <slot name="name"></slot>
                </div>
                <div class="motto">
                    <slot name="line1"></slot>
                    <br /><br />
                    <slot name="line2"></slot>
                    <br /><br />
                    <slot name="line3"></slot>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "feedBack",
}
</script>

<style scoped>
    .card{
        width: 88%;
        margin: 0 auto;
    }
    .author{
        height: 8rem;
        display: flex;
    }
    .iamge{
        flex: 1;
    }
    .content{
        flex: 2;
        display: flex;
        flex-direction: column;
    }
    .name{
        flex: 1;
        font-size: 1.2rem;
        font-weight: 900;
    }
    .motto{
        flex: 2;
        font-size: 0.5rem;
        color: #808080;
    }
</style>
