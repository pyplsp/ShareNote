<template>
    <div style="border-bottom: solid 1px #e6e6e6;">
        <el-menu mode="horizontal">
            <el-menu-item index="2">
                <div class="center"><slot name="center"></slot></div>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "userNav"
}
</script>

<style scoped>
    .center{
        text-align: center;
    }
</style>
