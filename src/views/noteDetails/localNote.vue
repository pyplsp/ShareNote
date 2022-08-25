<template>
    <div>
        <!-- 顶部标题，返回键与编辑/保存 -->
        <details-nav class="noteNav" :id = "id" :title = "note.title" @changeIsEditor = "getIsEditor" @changeIsEditorAndSave = "getIsEditorAndSave"></details-nav>
        <!-- 文本编辑的组件 -->
        <local-note-loading class="loading" v-if="isLoading"></local-note-loading>
        <details-content-editor v-show="!isLoading" :image-src = "note.noteImage" :content = "note.content" :is-editor = "isEditor"></details-content-editor>
        <!-- 查看收藏与是否被分享 -->
        <details-tab ref="detailsTab" class="detailsTab" :is-share = "note.shareStatus" :is-editor = "isEditor" :user-area-name = "note.userAreaName"></details-tab>
    </div>
</template>

<script>
import DetailsNav from "@/components/detailsModule/detailsNav.vue";
import DetailsContentEditor from "@/components/detailsModule/detailsContentEditor";
import DetailsTab from "@/components/detailsModule/detailsTab";
import localNoteLoading from "@/components/loading/noteLoading/NoteLoading";
import {details, update} from "@/network/contentData";

export default {
    name: "note",
    inject:['reload'],
    data(){
        return {
            id:0,
            isEditor:'',
            imageSrc:'',
            content:'',
            note:'',
            isLoading:true,
        }
    },
    methods:{
        // 切换可编辑标志位
        getIsEditor(isEditor){
            this.isEditor = isEditor;
        },
        // 切换可编辑标志位，并调用保存的接口
        getIsEditorAndSave(isEditor){
            //进行保存的接口
            let saveTitle;
            let saveContent;
            let saveArea;
            let changeShareArea;
            // 进行判断，假如说用户点了编辑，当未编辑时的标题和编辑完后的标题一样（或者说没改）
            // 那么 saveTitle 就没有值，即 undefined ，axios 的 api 进行网络请求的时候就不会带上这个 savaTitle 参数
            // 以减少网络传参消耗
            if(this.note.title !== this.$children[0].title1)
                saveTitle = this.$children[0].title1
            if(this.note.content !== this.$children[1].content1)
                saveContent =  this.$children[1].content1
            let saveimageRow = this.$children[1].imageRow
            if( this.$children[2].area!== '')
                saveArea = this.$children[2].area
            if(this.$children[2].shareArea !== ''){
                changeShareArea = this.$children[2].shareArea
            }
            if (saveTitle === ''){
                this.$message({
                    message:'未输入标题',
                    type: 'warning',
                    center: true,
                    duration:1000
                });
                return;
            }
            if (saveContent === ''){
                this.$message({
                    message:'未输入内容',
                    type: 'warning',
                    center: true,
                    duration:1000
                });
                return;
            }
            update(this.id,saveContent,saveTitle,saveimageRow,saveArea,changeShareArea).then(res =>{
                // this.global.changeNote = true
                this.$store.commit('changeNoteStatus')
                this.$router.replace('/home');
            }).catch(error =>{
                this.reload()
                this.$message.error({
                    message:'文章更新失败',
                    center:true,
                    duration:1300,
                });
            })
            this.isEditor = isEditor;
        }
    },
    beforeUpdate() {
        this.isLoading = false
    },
    components: {
        DetailsTab,
        DetailsNav,
        DetailsContentEditor,
        localNoteLoading},
    created() {
        this.id = Number(this.$route.query.id)
        details(this.id).then(res =>{
            this.note = res.data.data
        })
    }
}
</script>

<style scoped>
    .noteNav{
        position: fixed;
        top: 0;
        z-index: 10;
    }
    #detailsContentEditor{
        margin-top: 4rem;
        margin-bottom: 4rem;
    }
    .detailsTab{
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .loading{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        background-color: white;
        overflow: hidden;
    }
</style>
