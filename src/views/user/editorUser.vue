<template>
    <div>
        <!--    顶部导航。带返回按钮以及说明    -->
        <child-nav>
            <i @click="goToUser" slot="icon" class="el-icon-arrow-left"></i>
            <span slot="title">编辑信息</span>
        </child-nav>
        <div style="margin-top: 3rem"></div>
        <!--   编辑表单     -->
        <!-- 1.头像编辑 -->
        <editor-item :height="'6rem'" :property="'头像'" :theme="'var(--color-theme)'">
            <el-upload :disabled="!isEditor" slot="data" class="uploadImage" :action="''" :auto-upload="false" :show-file-list="false" :on-change="handleAvatarChangeIcon">
                <img v-if="headNow" :src="headNow" class="avatar">
            </el-upload>
        </editor-item>
        <!-- 2.名字编辑 -->
        <editor-item :height="'4rem'" :property="'名称'" :theme="'var(--color-theme)'">
            <el-input :disabled="!isEditor" slot="data" v-model="info.name"></el-input>
        </editor-item>
        <!-- 3.生日编辑 -->
        <editor-item :height="'4rem'" :property="'生日'" :theme="'var(--color-theme)'">
            <el-date-picker
                slot="data"
                :disabled="!isEditor"
                v-model="info.birthday"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期" />
        </editor-item>
        <!-- 4.介绍编辑 -->
        <editor-item :height="'10rem'" :property="'简介'" :theme="'var(--color-theme)'">
            <el-input
                :disabled="!isEditor"
                placeholder="暂无简介"
                slot="data"
                :rows="6"
                type="textarea"
                v-model="info.motto"
                maxlength="50"
                show-word-limit
                />
        </editor-item>

        <div class="option">
            <div><el-button round icon="el-icon-error" type="info" @click="cancel">取消</el-button></div>
            <div v-if="!isEditor"><el-button  round icon="el-icon-edit-outline" type="success" @click="editor">编辑</el-button></div>
            <div v-else><el-button round icon="el-icon-edit-outline" type="success" @click="confirm">完成</el-button></div>
        </div>
    </div>
</template>

<script>
import childNav from "@/components/user/childNav";
import editorItem from "@/components/user/editor/editorItem";
import {updateUserInfo} from '@/network/contentData'
export default {
    name: "editorUser",
    components:{
        childNav,
        editorItem
    },
    data(){
        return{
            info:{
                userHead:'',
                name:'',
                birthday:'',
                motto:'',
            },
            headNow:'',
            isEditor:false
        }
    },
    methods:{
        // 返回到 user 用户信息界面
        goToUser(){
            if(this.isEditor){
                this.$confirm('退出将不会保存当前编辑信息，是否退出', '取消编辑', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true,
                    showClose:false
                }).then(() => {
                    this.$router.back()
                }).catch(() => {

                });
            }else{
                this.$router.back()
            }
        },
        // 编辑信息
        editor(){
            this.isEditor = true
        },
        // 确认修改信息
        confirm(){
            updateUserInfo(
                this.info.userHead,
                this.info.name,
                this.info.birthday,
                this.info.motto
            ).then(res=>{
                this.setItemToStorage(
                    res.data.data.userHead,
                    res.data.data.name,
                    res.data.data.birthday,
                    res.data.data.motto,
                )
                this.getItemFromStorage()
                this.$store.commit('changeUserStatus')
                this.$toast('上传成功')
            }).catch(()=>{
                this.headNow = this.info.userHead = localStorage.getItem('userHead')
                this.$toast('上传失败')
            })
            this.isEditor = false
        },
        cancel(){
            this.getItemFromStorage()
            this.isEditor = false
        },
        // 从存储中获取用户信息
        getItemFromStorage(){
            this.info.userHead = localStorage.getItem('userHead')
            this.headNow = localStorage.getItem('userHead')
            this.info.name = localStorage.getItem('name')
            this.info.birthday = localStorage.getItem('birthday')
            this.info.motto = localStorage.getItem('motto')
        },
        // 将修改的信息存储起来
        setItemToStorage(userHead,name,birthday,motto){
            localStorage.setItem('userHead',userHead)
            localStorage.setItem('name',name)
            localStorage.setItem('birthday',birthday)
            localStorage.setItem('motto',motto)
        },
        handleAvatarChangeIcon(file){
            const isJPG = file.raw.type === 'image/jpeg'
            const isPNG = file.raw.type === 'image/png'
            if (!isPNG && !isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
                return false
            }else{
                this.headNow = URL.createObjectURL(file.raw);
                this.info.userHead = file.raw
            }

        },
    },
    created() {
        this.getItemFromStorage()
    },
}
</script>

<style scoped>
    .avatar{
        height: 5rem;
        width: 5rem;
        object-fit:cover;
        border-radius: 50%;
        vertical-align: middle;
    }
    .uploadImage{
        height: 100%;
    }
    .option{
        margin-top: 2rem;
        text-align: center;
        display: flex;
        justify-content:space-around;
    }


    ::v-deep .el-upload{
        width:6rem;
        height: 6rem;
        line-height: 6rem;
    }
    ::v-deep .el-input__inner{
        border-bottom: 3px solid #e6e6e6;
        border-top: none;
        border-right: none;
        border-left: none;
    }
    ::v-deep .el-date-editor{
        width: 100%;
    }
    ::v-deep .el-textarea__inner{
        vertical-align: middle;
        display: inline-block;
    }
    ::v-deep .el-input__count{
        line-height: initial;
        bottom: 0.7rem;
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
