<template>
    <div v-show="show" style="
        margin-top: 3rem;
        margin-bottom: 3rem;"
    >
        <el-skeleton animated >
            <template slot="template">
                <el-skeleton-item
                    variant="iamge"
                    style="width: 70%;
                    height: 10rem;
                    margin: 1rem auto;
                    display: block;
                " />
                <div>
                    <el-skeleton-item style="display: block;margin: 1rem auto 1rem 3.5rem;width: 80%;" variant="text" />
                    <el-skeleton-item v-for="(n,index) in 10" :key="'s1-' + index" style="display: block;margin: 1rem auto;width: 90%;" variant="text" />
                    <el-skeleton-item style="display: block;margin: 1rem auto 1rem 3.5rem;width: 80%;" variant="text" />
                    <el-skeleton-item v-for="(n,index) in 10" :key="'s2-' + index" style="display: block;margin: 1rem auto;width: 90%;" variant="text" />
                </div>
            </template>
        </el-skeleton>
    </div>
</template>

<script>
export default {
    name: "localNoteLoading",
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
