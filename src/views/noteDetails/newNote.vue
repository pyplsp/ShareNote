<template>
    <div id = "newNote">
        <!-- 回退与保存 -->
        <div class="back">
            <div @click = "cancleEditor" >取消</div>
            <div><i @click = "save" class="el-icon-upload"></i></div>
        </div>
        <!-- 标题 -->
        <div class="title">
            <el-input v-model="title" prefix-icon="el-icon-edit" placeholder="请输入标题"></el-input>
        </div>
        <!-- 图片 -->
        <div class="noteImage">
            <el-upload class="uploadImage" :action="''" :auto-upload="false" :show-file-list="false" :on-change="handleAvatarChangeIcon">
                <img v-if="havaImage" :src="havaImage" :class="{'avatar':'havaImage'}">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <!-- 文本内容 -->
        <el-input type="textarea" v-model="content" placeholder="待编辑" autosize></el-input>
    </div>
</template>

<script>
import {add} from "@/network/contentData";
export default {
    name: "newNote",
    components: {},
    data(){
        return{
            title:'',
            content:'',
            file:'',
            havaImage:'http://211.159.225.217:8080/image/2-d.jpg',
        }
    },
    methods:{
        save(){
            clearTimeout(this.TimeId)
            if (this.title === ''){
                this.$toast('未输入标题')
                return;
            }
            if (this.content === ''){
                this.$toast('未输入内容')
                return;
            }
            add(this.content,this.title,this.file).then(res =>{
                this.$loading('保存中...')
                this.$store.commit('changeNoteStatus')
                this.$router.replace('/home')
            }).catch()
        },
        cancleEditor(){
            this.$confirm('退出将不会保存文件，是否退出', '取消编辑', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                showClose:false
            }).then(() => {
                this.$router.back()
            }).catch(() => {

            });
        },
        handleAvatarChangeIcon(file) {//选中文件触发的change事件
            // console.log(file)
            const isJPG = file.raw.type === 'image/jpeg'
            const isPNG = file.raw.type === 'image/png'
            // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
            if (!isPNG && !isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
                return false
            } else {
                this.file = file.raw
                this.havaImage = URL.createObjectURL(file.raw);//赋值图片的url，用于图片回显功能
            }
        },
    }
}
</script>

<style scoped>
    .back{
         display: flex;
         height: 3rem;
         width: 100%;
         background-color: var(--color-theme);
         margin-bottom: 0.5rem;
         color: white;
         /*font-size: 1.5rem;*/
         box-sizing: border-box;
         position: fixed;
         top: 0;
         left: 0;
         z-index: 10;
     }
    .back > div:first-child{
        flex: 1;
        display: block;
        box-sizing: border-box;
        line-height: 3rem;
        padding-left: 1rem;
    }
    .back >div:last-child{
        flex: 1;
        height: 3rem;
        box-sizing: border-box;
        line-height: 3rem;
        padding-right: 1rem;
        text-align: right;
    }
    .title{
        margin-top: 3rem;
        height: 3rem;
        box-sizing: border-box;
        position: relative;
    }
    .el-input{
        width: 80%;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .title >>> .el-input__inner{
        border-top: none;
        border-left: none;
        border-right: none;
        color: var(--color-theme);
        font-size: 0.9rem;
        text-align: center;
    }

    .noteImage{
        height: 10rem;
        margin-top: 1rem;
    }
    .uploadImage{
        margin: 0 auto;
        width: 17rem;
        height: 100%;
        max-width: 70%;
        max-height: 100%;
        text-align: center;
        font-size: 2rem;
        vertical-align: middle;
        line-height: 10rem;
        color: var(--color-theme);
        border: dashed 1px red;
        overflow: hidden;
    }
    .avatar{
        height: 10rem;
        width: 17rem;
        object-fit:cover;
    }
    #newNote>>>.el-textarea__inner{
        border: 0;
        resize: none;
    }
    .el-textarea{
        display: block;
        margin: 2rem auto;
        width: 90%;
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
