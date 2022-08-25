<template>
    <div id="detailsNav">
        <div @click = "cancleEditor" v-if="isEditor" class="cancel">取消</div>
        <div v-else class="back" @click = "back()"><i class="el-icon-arrow-left"></i></div>
        <input v-if ="isEditor" contenteditable="true" class="title" v-model="title1"></input>
        <input v-else contenteditable="true" class="title" v-model="title1" readonly = "readonly"></input>
        <div v-if="isEditor" class="editor"> <span @click = "changeIsEditorAndSave()">保存</span></div>
        <div v-else class="editor"> <span @click = "changeIsEditor()">编辑</span></div>
    </div>
</template>

<script>
export default {
    name: "detailsNav",
    inject:['reload'],
    data(){
        return {
            noteDetails:'',
            isEditor:false,
            title1:undefined,
            allArea:''
        }
    },
    props:['id','title'],
    watch:{
        title(newvalue){
            this.title1 = newvalue
        }
    },
    methods:{
        cancleEditor(){
            this.$confirm('退出将不会保存文件，是否退出', '取消编辑', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                showClose:false
            }).then(() => {
                this.reload()
            }).catch(() => {

            });

        },
        back(){
            this.$router.replace('/home');
        },
        changeIsEditor(){
            this.isEditor = !this.isEditor;
            this.$emit('changeIsEditor',this.isEditor)
        },
        changeIsEditorAndSave(){
            this.isEditor = !this.isEditor;
            this.$emit('changeIsEditorAndSave',this.isEditor)
        }
    },
    created() {
        this.title1 = this.title
    }
}
</script>

<style scoped>
    #detailsNav{
        width: 100%;
        height: 3rem;
        display: flex;
        flex-direction: row;
        background-color: var(--color-theme);
        color: white;
    }
    .back{
        line-height: 3rem;
        flex: 1;
        padding-left: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }
    .title{
        /*color: var(--color-theme);*/
        background-color: var(--color-theme);
        color: white;
        line-height: 3rem;
        flex: 1;
        text-align: center;
        outline:none;
        border:0;
    }
    .editor{
        line-height: 3rem;
        flex: 1;
        padding-right: 1rem;
        text-align: right;
    }
    .cancel{
        flex: 1;
        padding-left: 1rem;
        text-align: left;
        line-height: 3rem;
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
