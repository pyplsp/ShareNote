<template>
    <div>
        <!-- 导航 -->
        <child-nav>
            <i @click="goToUser" slot="icon" class="el-icon-arrow-left"></i>
            <span slot="title">我的收藏</span>
            <span v-if="!isDelete" @click="isDelete = true" slot="other">编辑</span>
            <span v-if="isDelete" @click="isDelete = false" slot="other">取消</span>
        </child-nav>



        <!-- 序列 -->
        <el-card class="card">
            <div class="inCard" v-for="(item,index) in allCollection" :key="index" @click="seeNoteInCollection(item.areaName)">
                {{item.areaName + ' (' + item.noteCount + ')'}}
                <div @click.stop="deleteCollection(item.areaName,index)" v-if="isDelete" class="deleteIcon"><i class="el-icon-remove"></i></div>
            </div>
            <div class="add">
                <i v-if="!isAdding" @click="isAdding = true" class="el-icon-circle-plus"></i>
                <el-input placeholder="添加收藏夹" v-model="addCollectionName" v-else>
                    <i slot="suffix" class="el-icon-close" @click="cancelconfirm">取消</i>
                    <i slot="suffix" class="el-icon-check" @click="confirm">确定</i>
                </el-input>
            </div>
        </el-card>


        <!-- 开启某个收藏夹查看内部之内容 -->
        <el-dialog
            :visible.sync="isSeeArticle"
            :title="collectArticle.areaName"
            width="90%"
            top="7rem"
            @close='closeDialog'
        >
            <div style="height: 21rem;overflow: scroll">
                <note-card
                    v-for="(item,index) in collectArticle.data"
                    :key="index"
                    @goGoGo="goToShareDetail(item.noteId)"
                >
                    <img style="width: 100%;height:100%;border-radius: 20%"
                         slot="image"
                         :src="item.noteImage"
                         alt="图片无法显示">
                    <span slot="name">{{item.name}}</span>
                    <span slot="createTime">{{item.upTime ? item.upTime.split("T")[0] : ''}}</span>
                    <span slot="title">{{item.title}}</span>
                    <span slot="content">{{item.content}}</span>
                </note-card>

                <div class="isNone" v-show="collectArticle.data.length === 0">
                    暂无收藏
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import childNav from "@/components/user/childNav";
import noteCard from "@/components/noteCard/noteCard";
import {mark,addMark,deleteMark,getMarkByAreaName} from '@/network/contentData'
export default {
    name: "collect",
    data(){
        return {
            isAdding:false,
            isDelete:false,
            isSeeArticle:false,
            // 当前的总收藏夹数量
            allCollection:[],
            // 当前要添加的收藏夹名称
            addCollectionName:'',

            // 当前收藏夹内部的收藏资料
            collectArticle:{
                areaName:"",
                data:[],
            }
        }
    },
    methods:{
        goToUser() {
            this.$router.back()
        },
        // 确认添加该收藏夹
        confirm(){
            if(this.addCollectionName === ''){
                this.$toast('收藏夹名称不能为空！')
                return
            }
            addMark(this.addCollectionName).then(()=>{
                this.allCollection.push({
                    areaName:this.addCollectionName,
                    noteCount:0,
                })
                this.addCollectionName = ''
                this.isAdding = false
                this.$toast('添加成功！')
            }).catch(()=>{
                this.$toast('添加失败！')
            })
        },
        // 取消添加收藏夹
        cancelconfirm(){
            this.isAdding = false
            this.addCollectionName = ''
        },
        // 删除收藏夹
        deleteCollection(title,index){
            this.$confirm('删除收藏夹将会删除内部的文章，是否删除', '删除"' + title + '"', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                showClose:false
            }).then(() => {  // 调用删除接口
                deleteMark(title).then(()=>{
                    this.allCollection.splice(index,1)
                    this.$toast('删除成功！')
                }).catch(()=>{
                    this.$toast('删除失败！')
                })
            }).catch(()=>{

            })
        },
        // 查看某收藏夹内部笔记
        seeNoteInCollection(areaName){
            this.$loading('加载中...')
            this.collectArticle.areaName = areaName
            getMarkByAreaName(areaName).then(res=>{
                this.collectArticle.data = res.data.data
                this.isSeeArticle = true
                this.$loading.close()
            })
        },
        // 点击收藏夹内笔记跳转到笔记详情页
        goToShareDetail(id){
            this.$router.push({
                path:'/shareNote',
                query:{
                    id:id
                }
            })
        },
        // 关闭当前收藏夹
        closeDialog(){
            this.collectArticle.areaName = ''
            this.collectArticle.data = []
        }
    },
    components:{
        childNav,
        noteCard
    },
    created() {
        mark().then(res=>{
            this.allCollection = res.data.data
        })
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
    .deleteIcon{
        position: absolute;
        top: 0;
        right: 0;
        width: 2rem;
        height: 100%;
        line-height: 3rem;
        font-size: 1rem;
    }
    .add{
        height: 4rem;
        line-height: 4rem;
        font-size: 2rem;
        font-weight: 900;
        color: var(--color-theme);
        text-align: center;
    }
    .isNone{
        text-align: center;
        font-size: 2rem;
        font-weight: 900;
        margin-top: 8rem;
        color: #ececec;
    }
    ::v-deep .el-input__inner{
        border-bottom: 3px solid #e6e6e6;
        border-top: none;
        border-right: none;
        border-left: none;
    }
    ::v-deep .el-dialog__header{
        color: white;
        background-color: var(--color-theme);
    }
    ::v-deep .el-dialog__header > span{
        color: white;
    }
    ::v-deep .el-dialog__header i{
        color: white;
    }
</style>
<style>
.el-message-box {
    width: 250px;
}
.el-message-box__title{
    color: var(--color-theme);
}
.el-message-box__message{
    color: var(--color-theme);
}
</style>
