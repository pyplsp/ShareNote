<template>
    <div>
        <child-nav>
            <i @click="goToUser" slot="icon" class="el-icon-arrow-left"></i>
            <span slot="title">我的分区</span>
            <span v-if="!isDelete" @click="isDelete = true" slot="other">编辑</span>
            <span v-if="isDelete" @click="isDelete = false" slot="other">取消</span>
        </child-nav>


        <!-- 序列 -->
        <el-card class="card">
            <div class="inCard" v-for="(item,index) in allArea" :key="index">
                {{item}}
                <div @click.stop="deleteArea(item,index)" v-if="isDelete" class="deleteIcon"><i class="el-icon-remove"></i></div>
            </div>
            <div class="add">
                <i v-if="!isAdding" @click="isAdding = true" class="el-icon-circle-plus"></i>
                <el-input placeholder="添加分区" v-model="addAreaName" v-else>
                    <i slot="suffix" class="el-icon-close" @click="cancelconfirm">取消</i>
                    <i slot="suffix" class="el-icon-check" @click="confirm">确定</i>
                </el-input>
            </div>
        </el-card>

    </div>
</template>

<script>
import childNav from "@/components/user/childNav";
import {addMark, deleteMark,onlyAreaName,deleteArea,addArea} from "@/network/contentData";
export default {
    name: "myArea",
    data(){
        return{
            isAdding:false,
            isDelete:false,
            addAreaName:'',
            allArea:[]
        }
    },
    methods:{
        goToUser() {
            this.$router.back()
        },
        // 删除个人分区
        deleteArea(item,index){
            this.$confirm('是否删除分区，删除后分区内笔记将会移除', '删除"' + item + '"', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                showClose:false
            }).then(() => {  // 调用删除接口
                deleteArea(item).then(() =>{
                    this.allArea.splice(index,1)
                    this.$store.commit('changeNoteStatus')
                    this.$toast('删除分区成功！')
                })
            }).catch(()=>{
                this.$toast('删除分区失败！')
            })
        },
        confirm(){
            if(this.addCollectionName === ''){
                this.$toast('收藏夹名称不能为空！')
                return
            }
            addArea(this.addAreaName).then(res=>{
                this.allArea.push(res.data.data.areaName)
                this.isAdding = false
                this.addAreaName = ''
                this.$store.commit('changeNoteStatus')
                this.$toast('添加分区成功！')
            }).catch(()=>{
                this.$toast('添加分区失败！')
            })
        },
        cancelconfirm(){
            this.isAdding = false
            this.addAreaName = ''
        },
    },
    created() {
        onlyAreaName().then(res =>{
            this.allArea = res.data.data
        })
    },
    components:{
        childNav
    }
}
</script>

<style scoped>
    .card{
        width: 95%;
        margin: 4rem auto 0;
    }
    .inCard{
        position: relative;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.3rem;
        font-weight: 900;
        color: var(--color-theme);
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
    }
    .add{
        height: 4rem;
        line-height: 4rem;
        font-size: 2rem;
        font-weight: 900;
        color: var(--color-theme);
        text-align: center;
    }
    .deleteIcon{
        position: absolute;
        top: 0;
        right: 0;
        width: 2rem;
        height: 100%;
        line-height: 3rem;
        font-size: 1rem;
    }
    ::v-deep .el-input__inner{
        border-bottom: 3px solid #e6e6e6;
        border-top: none;
        border-right: none;
        border-left: none;
    }
</style>
