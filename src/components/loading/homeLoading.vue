<template>
    <div class="loading" v-show="show" >
        <el-skeleton animated v-for="(n,index) in 4" :key="index"
            style="
                width: 50%;
                box-sizing: border-box;
                padding: 1.8rem;
                text-align: center;
                margin-bottom: 0;
                border-radius: 30px;"

        >
            <template slot="template">
                <el-skeleton-item variant="image" style="width: 100%;height: 7rem;" />
                <div style="margin-top: 0.1rem">
                    <el-skeleton-item style="width: 100%;height: 1.2rem;" />
                </div>
            </template>
        </el-skeleton>
    </div>
</template>

<script>
export default {
    name: "homeLoading",
    props:{
        show:{
            default:true,
            type:Boolean
        }
    }
}
</script>

<style scoped>
    .loading{
        width: 100%;
        display: flex;
        flex-wrap:wrap;
    }
</style>
