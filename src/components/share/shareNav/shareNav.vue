<template>
    <div id="nav">
        <el-menu mode="horizontal">
            <el-dropdown-item class="logo" disabled><i><strong>Share Note</strong></i></el-dropdown-item>
            <el-dropdown-item class="search"><i class="el-icon-search" @click = "isSearch"></i></el-dropdown-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "shareNav.vue",
    data(){
        return{
            isPackUp:false,
            searchStatus:false
        }
    },
    methods:{
        isSearch(){
            this.searchStatus = !this.searchStatus
            this.$emit('isSearch',this.searchStatus)
        }
    }
}
</script>

<style scoped>
    #nav{
        width: 100%;
    }
    .el-menu{
        display: flex;
        text-align: center;
        font-size: 1.5rem;
        height: 3.8rem;
    }
    .logo {
        font-size: 2rem;
        color: var(--color-theme);
        flex: 1;
        line-height: 60px;
        padding-right: 0;
        padding-left: 0;
    }
    .search {
        line-height: 60px;
        width: 6rem;
        box-sizing: border-box;
        padding-left: 2rem;
        font-size: 1.55rem;
        color: var(--color-theme);
    }
    .serach > i {
        font-size: 1.5rem;
    }
</style>
