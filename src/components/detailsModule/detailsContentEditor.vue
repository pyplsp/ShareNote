<template>
    <div id="detailsContentEditor">
        <!-- 编辑模式：进行图片切换  浏览模式：显示图片 -->
        <div class="editorImg" v-if="isEditor">
            <div class="showOldImage" :style="{backgroundImage:'url(' + imageSrc + ')',}"></div>
            <el-upload class="uploadImage" :action="''" :auto-upload="false" :show-file-list="false" :on-change="handleAvatarChangeIcon">
                <img v-if="havaImage" :src="havaImage" :class="{'avatar':'havaImage'}">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <img v-else :src = "imageSrc" alt="">
        <!-- 编辑模式：可以编辑文本  浏览模式：只读文本 -->
        <el-input v-if="isEditor" type="textarea" v-model="content1" autosize></el-input>
        <el-input v-else type="textarea" size="middle" readonly="readonly" v-model="content1" autosize></el-input>
    </div>
</template>

<script>
export default {
    name: "detailsContentEditor",
    data(){
        return{
            content1:undefined,
            havaImage:'',
            imageRow:'',
        }
    },
    components: {},
    props:['isEditor','imageSrc','content',],
    watch:{
        content(newvalue){
            this.content1 = newvalue;
        }
    },
    created() {
        this.content1 = this.content
    },
    methods:{
        handleAvatarChangeIcon(file) {//选中文件触发的change事件
            const isJPG = file.raw.type === 'image/jpeg'
            const isPNG = file.raw.type === 'image/png'
            // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
            if (!isPNG && !isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
                return false
            } else {
                this.imageRow = file.raw
                this.havaImage = URL.createObjectURL(file.raw);//赋值图片的url，用于图片回显功能
            }
        },
    }
}
</script>

<style scoped>
    #detailsContentEditor{
        width: 100%;
    }
    img{
        display: block;
        width: 70%;
        height: 10rem;
        margin: 1rem auto;
    }
    .editorImg{
        /*width: 90%;*/
        position: relative;
        height: 10rem;
        margin: 1rem auto;

        /*opacity: 0.5;*/
    }
    .showOldImage{
        position: absolute;
        width: 70%;
        height: 10rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        left: 0;
        right: 0;
        margin: auto;
        filter: blur(3px);
        z-index: -1;
    }
    #detailsContentEditor>>>.el-textarea__inner{
        border: 0;
        resize: none;
    }
    .avatar{
        height: 10rem;
        width: 17rem;
        object-fit:cover;
        margin-top: 0;
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
    el-upload--text{
        width: 100%;
        height: 100%;
    }
</style>
