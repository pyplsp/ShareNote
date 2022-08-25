<template>
    <div id="detailsTab">
        <!-- 是否分享 -->
        <div>
            <el-dropdown v-if="isEditor" trigger="click" @command = "changeShareStatus">
                <span class="el-dropdown-link">
                    <i v-if="shareArea" class="el-icon-edit-outline">{{shareArea}}</i>
                    <i  v-else class="el-icon-edit-outline">{{isShare ? '已分享':'不分享'}}</i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="不分享">不分享</el-dropdown-item>
                    <el-dropdown-item v-for="(item,index,key) in AllShareArea" :key = "key" :command = "item" >{{item}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <!-- 非编辑状态下不可以分享 -->
            <i v-else class="el-icon-share">{{isShare ? '已分享':'不分享'}}</i>
        </div>
        <!-- 查看/编辑分区 -->
        <div>
            <el-dropdown v-if="isEditor" trigger="click" @command = "changeArea">
                 <span class="el-dropdown-link">
                    <i v-if="area" class="el-icon-edit-outline">{{area}}</i>
                    <i v-else class="el-icon-edit-outline">{{userAreaName}}</i>
                 </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index,key) in AllArea" :key = "key" :command = "item" >{{item}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <i v-if="!isEditor" class="el-icon-collection-tag"></i>
            <span v-if="!isEditor">{{userAreaName}}</span>
        </div>
    </div>
</template>

<script>
import {update} from "@/network/contentData";
import {onlyAreaName} from "@/network/contentData";
import {AllShareTitle} from "@/network/contentData";
export default {
    name: "detailsTab",
    data(){
        return {
            // 用户个人的所有分区
            AllArea:'',
            // 当变更分区后才会赋值，值为新的分区
            area:'',



            // 所有的分享分区，一般为固定值，但是也需要从后端获取
            AllShareArea:'',
            // 当变更分享分区后才会赋值，值为新的分享分区
            shareArea:''
        }
    },
    props:['isEditor','userAreaName','isShare'],
    created() {
        onlyAreaName().then(res =>{
            this.AllArea = res.data.data
        })
        AllShareTitle().then(res =>{
            this.AllShareArea = res.data.data
        })
    },
    methods:{
        changeArea(item){
            this.area = item
        },
        changeShareStatus(item){
            this.shareArea = item
        }
    }
}
</script>

<style scoped>
    #detailsTab{
        height: 3rem;
        background-color: var(--color-theme);
        display: flex;
    }
    #detailsTab >div{
        flex: 1;
        font-size: 1rem;
        box-sizing: border-box;
        /*padding-left: 2rem;*/
        line-height: 3rem;
        color: white;
        text-align: center;
    }
    .el-icon-collection-tag{
        font-size: 1rem;
        color: white;
    }
    .el-icon-edit-outline{
        font-size: 1rem;
        color: white;
    }
</style>
