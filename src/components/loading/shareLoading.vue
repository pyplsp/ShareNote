<template>
    <div class="loading" v-show="show">
        <el-skeleton animated >
            <template slot="template">
                <div style="display: flex;height: 5rem;padding: 10px;" v-for="(n,index) in 4" :key="index">
                    <el-skeleton-item
                        variant="iamge"
                        style="width: 30%;height: 100%;margin-right: 0.5rem;"
                    />
                    <div style="width: 70%">
                        <div style="display: flex">
                            <el-skeleton-item variant="text" style="flex: 1; margin-right: 6rem" />
                            <el-skeleton-item variant="text" style="flex: 2;" />
                        </div>
                        <el-skeleton-item variant="text" style="margin-top: 1rem;width: 50%" />
                        <el-skeleton-item variant="text" style="margin-top: 0.5rem;width: 100%" />
                    </div>
                </div>
            </template>
        </el-skeleton>
    </div>
</template>

<script>
export default {
    name: "shareLoading",
    props:{
        show:{
            default:true,
            type:Boolean
        }
    }
}
</script>

<style scoped>

</style>
