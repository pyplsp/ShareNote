<template>
    <div>
        <el-menu mode="horizontal"
                 menu-trigger="click"
                 @select="changeIsSearch"
                 @open="clickTheManu(1)"
                 active-text-color="var(--color-theme)"
                 default-active="全部"
        >
            <!-- 分类选择 -->
            <el-submenu index="1" class="classify">

                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                </template>

                <el-menu-item
                    v-for="(item,index,key) in classify"
                    class="inClassify"
                    :key="key"
                    :index="item"
                    :ref="'sudo'+index"
                >
                    {{ item }}
                </el-menu-item>

                <el-menu-item class="inClassify" index="全部">
                    全部
                </el-menu-item>
            </el-submenu>

            <!-- LOGO -->
            <el-menu-item class="logo" index="2"><img src="@/assets/img/LOGO.png" alt=""></el-menu-item>

            <!-- 搜索 -->
            <el-menu-item class="search" index="3"><i class="el-icon-search"></i></el-menu-item>

        </el-menu>
        <transition name="el-fade-in-linear">
            <el-input v-if="isSearch" v-model="search" placeholder="全部范围搜索 ~"></el-input>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'homeNav',
    props:['classify','nowClassify'],
    data() {
        return {
            // 主页的分类数据
            search: '',
            isSearch: false
        }
    },
    methods: {
        changeIsSearch(key,keyPath) {
            // 点击搜索按钮打开搜索框
            if(key === "3" && this.isSearch === false){
                this.isSearch = !this.isSearch
                return
            } else if(this.isSearch === true){ // 若此时已经打开搜索框
                this.$emit('getSearchContent',this.search)
                this.isSearch = !this.isSearch
                this.search = ''
            } else if(keyPath[0] === '1'){ // 倘若选择的是下拉框
                this.$emit('getAreaName',key)
            }
        },
        // 打开下拉按钮的时候发送事件出去以请求获取 classify 数据
        clickTheManu(){
            this.$emit('getAllAreaNameDate')
        }
    }
}
</script>

<style scoped>
    .el-menu {
        display: flex;
        text-align: center;
    }

    .el-icon-s-operation:before {
        color: var(--color-theme);
    }

    .el-menu--horizontal > .el-menu-item {
        color: var(--color-theme);
    }

    .el-icon-search:before {
        color: var(--color-theme);
    }

    .classify {
        width: 6rem;
        padding-left: 0;
    }

    .logo {
        flex: 1;
    }

    .logo img {
        width: 50%;
        height: 50%;
        object-fit: cover;
    }

    .search {
        width: 6rem;
        padding-right: 0;
    }

    .search > i {
        font-size: 1.5rem;
    }
    .inClassify {
        text-align: center;
    }
    .active{
        background-color: var(--color-theme);
        color: white;
    }
    ::v-deep .el-input__inner{
        border:none;
        border-bottom: 2px solid var(--color-theme);
        border-radius:0;
    }
</style>
