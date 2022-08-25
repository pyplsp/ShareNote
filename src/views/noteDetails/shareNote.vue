<template>
    <div id="shareNote">
        <!--   顶部栏     -->
        <div class="back">
            <i class="el-icon-arrow-left" @click = "back"></i>
            <div>
                <img @click="goToUserDetail(detail.userId)" class="userHead" :src="detail.userHead" alt="">
                {{detail.name}}
            </div>
            <div>
                <div class="attention" @click="clickFollow(detail.userId)" v-show="!isLoading && String(detail.userId) !== myUserId">
                    <span v-if="!detail.fanStatus">+ 关注</span>
                    <span v-else>已关注</span>
                </div>
            </div>
        </div>

        <!--    加载动画    -->
        <note-loading class="loading" :show = "isLoading"></note-loading>

        <!--   展示内容     -->
        <div class="title"><h3>{{detail.title}}</h3></div>
        <img class="picture" :src="detail.noteImage" alt="">
        <el-input v-model="detail.content" type="textarea" readonly="readonly" autosize></el-input>


        <!--   分割线     -->
        <el-divider class="fg"><i style="color: var(--color-theme)" class="el-icon-s-comment"></i></el-divider>


        <!--    排序方式：默认排序，按照时间排序    -->
        <div class="sort">
            <div>
                {{'评论列表 (' + haveComment.length + ')'}}
            </div>
            <div><span @click="changeSort"><i class="el-icon-s-operation"></i>{{sortByTime ? ' 按时间':' 按热度'}}</span></div>
        </div>


        <!--   展示评论 评论内容 收起评论    -->
        <div class="showComment">
            <!--     点击展示评论       -->
            <div v-show="!showIcon" class="showIcon" @click = "showIcon = true">
                <i class="el-icon-arrow-down"></i>
                <br>
                <span>展示评论</span>
            </div>

            <!--      评论的内容      -->
            <comment-card
                v-show="showIcon"
                v-for="(item,index) in haveComment"
                :key="index"
                :if-show-tab="true"
                theme="var(--color-theme)"
                bo-bo="rgb(152, 162, 170)"
                :child-content="item.childComment"
                :if-show-delete="item.userId.toString() === userId"
                @clickDelete="deleteMyComment(index,item.id)"
                :if-show-look-more-and-comment = "true"
                @LookMoreAndComment="lookMoreComment(item.id,index)"
                :look-more-and-comment-text="item.childCount <= 3 ? '添加评论>>':'评论 / 查看全部 ' + item.childCount + ' 条数据>>'"
                :if-like = "item.likeStatus"
                :like-counts = "item.likeCount"
                @like = "clickLike(index,item.id)"
            >
                <slot slot="userHead"><img @click="goToUserDetail(item.userId)" :src="item.userHead" alt=""></slot>
                <slot slot="userName"><strong>{{item.name}}</strong></slot>
                <slot slot="createTime">第{{index+1}}楼&nbsp;&nbsp;{{timeFormat(item.createTime)}}</slot>
                <slot slot="content">{{item.content}}</slot>
            </comment-card>

            <!--     点击收起评论       -->
            <div v-show="showIcon" class="showIcon" @click = "showIcon = false">
                <i class="el-icon-arrow-up"></i>
                <br>
                <span>收起评论</span>
            </div>
        </div>


        <!--   显示更多评论     -->
        <el-dialog
            @closed = "closeMoreComment"
            :visible.sync="dialogVisible"
            :title="moreCommentChild.length >0 ? '更多评论 (' + moreCommentChild.length + ')': '暂无评论'"
            width="90%"
            top="7rem"
        >
            <div style="position: relative">
                <div
                    style="max-height: 19.2rem"
                    :class="{'setHeightOne':moreCommentChild.length === 0 || moreCommentChild.length === 1,
                             'setHeightTwo':moreCommentChild.length === 2,
                             'setHeightThree':moreCommentChild.length >=3}"
                    class="inDialog"
                >
                    <div v-show="moreCommentChild.length === 0" style="
                        text-align: center;
                        line-height: 6.4rem;
                        color: #98a2aa;
                        font-size: 1.2rem;
                    ">
                        期待您的评论
                    </div>
                    <!-- 二级评论内的子评论 -->
                    <comment-card
                        v-for="(item,index) in moreCommentChild"
                        :key="index"
                        :if-show-tab="true"
                        theme="var(--color-theme)"
                        bo-bo="rgb(152, 162, 170)"
                        :if-show-delete="item.userId.toString() === userId"
                        @clickDelete="deleteMyComment(index,item.id)"
                        :if-show-look-more-and-comment="false"
                        :if-like = "item.likeStatus"
                        :like-counts = "item.likeCount"
                        @like = "clickLike(index,item.id)"
                    >
                        <slot slot="userHead"><img @click="goToUserDetail(item.userId)" :src="item.userHead" alt=""></slot>
                        <slot slot="userName"><strong>{{item.name}}</strong></slot>
                        <slot slot="createTime">第{{index+1}}楼&nbsp;&nbsp;{{timeFormat(item.createTime)}}</slot>
                        <slot slot="content">{{item.content}}</slot>
                    </comment-card>
                    <el-input
                        v-model="childComment"
                        placeholder="如何评价"
                    >
                        <i slot="suffix" class="el-icon-position" @click = "sendChildComments()"></i>
                    </el-input>
                </div>
            </div>
        </el-dialog>


        <!-- 显示收藏夹 -->
        <el-dialog
            :visible.sync="isShowCollect"
            @close="isShowCollect = false"
            title="收藏夹"
            width="80%"
            top="7rem"
        >
            <div style="height: 17rem;overflow: scroll;">
                <div style="height: 3rem;padding-left: 1rem;line-height: 3rem;font-size: 1.2rem;color: var(--color-theme);width: 80%;margin: 0 auto"
                     v-for="(item,index) in allCollection" :key="index"
                     :style="{borderBottom:'1px solid #e6e6e6'}"
                     @click="addToCollection(item.areaName,index)"
                >
                    {{item.areaName + ' (' + item.noteCount + ')'}}
                </div>
            </div>
        </el-dialog>

        <!--   底栏:包括发表评论，点赞，收藏     -->
        <div class="shareNoteTab" v-show="!isLoading">
            <!--     评论框       -->
            <div class="comment">
                <el-input
                    v-model="comment"
                    prefix-icon="el-icon-edit"
                    placeholder = "如何评价"
                >
                    <i slot="suffix" class="el-icon-position" @click = "sendComments()"></i>
                </el-input>
            </div>
            <!--     收藏       -->
            <div class="collect">
                <div class="collectIcon">
                    <i @click="collect" class="iconfont py-star" :style="{color:(detail.markStatus === 1 ? '#ff8785':'white')}"></i>
                </div>
                <div class="count">{{detail.markCount}}</div>
            </div>
            <!--     点赞       -->
            <div class="like">
                <div class="likeIcon">
                    <i @click="likeOrDislikeNote"  :style="{color:(detail.likeStatus === 1 ? '#ff8785':'white')}"  class="iconfont py-like"></i>
                </div>
                <div class="count">{{detail.likeCount}}</div>
            </div>
        </div>

    </div>
</template>

<script>
import commentCard from "@/components/commentCard/commentCard";
import noteLoading from "@/components/loading/noteLoading/NoteLoading";
import {
    getShareNoteById,
    sendComment,
    getCommentByTime,
    getCommentByLike,
    getCommentChild,
    deleteCommentById,
    sendCommentChild,
    likeComment,
    dislikeComment,
    likeNote,
    dislikeNote,
    mark,
    addNoteMark,
    cancelNoteMark,
    followUser,
    disFollowUser,
} from '@/network/contentData'
export default {
    name: "shareNote",
    components: {commentCard,noteLoading,},
    data(){
        return {
            // 文章详情
            detail:'',
            // 写 一 / 二 级评论时绑定的数据
            comment:'',
            childComment:'',
            // 打开页面时拉取到的所有评论
            haveComment:'',
            // 展示评论为true，否则为false，初始状态下展示评论
            showIcon:true,
            // 是否显示弹窗
            dialogVisible: false,
            // 点击查看更多时，请求当前父级评论id 和 所有的二级评论的数据,以及当前所在的序号
            nowFatherId:"",
            moreCommentChild:'',
            moreCommentIndex:'',
            // 该登录用户的id
            userId:'',
            // 更改评论的排序方式，false为按热度排序，true为按时间排序
            sortByTime:false,
            // 是否显示加载动画
            isLoading:true,
            // 是否显示收藏夹
            isShowCollect:false,
            // 当前的所有收藏夹
            allCollection:[],
        }
    },
    computed:{
        myUserId(){
            return localStorage.getItem('id')
        }
    },
    methods:{
        back(){
            this.$router.back()
        },
        // 改变排序方式 (热度排序 和 时间排序)
        changeSort(){
            // 当前为按热度排序，则需要更换为按时间排序，调用时间排序api
            if(this.sortByTime === false){
                getCommentByTime(this.$route.query.id).then(res => {
                    this.haveComment = res.data.data
                })
            }
            // 当前为按时间排序，则需要更换为按热度排序，调用热度排序api
            else {
                getCommentByLike(this.$route.query.id).then(res =>{
                    this.haveComment = res.data.data
                })
            }
            this.sortByTime = !this.sortByTime
        },
        // 点赞该笔记或取消点赞笔记
        likeOrDislikeNote(){
            // 鉴定为未点赞，需要调用点赞接口
            if(this.detail.likeStatus === 0){
                likeNote(this.$route.query.id).then(()=>{
                    this.detail.likeStatus = 1
                    this.detail.likeCount += 1
                    this.$toast('赞！')
                }).catch(()=>{
                    this.$toast('点赞失败！')
                })
            }else{
                dislikeNote(this.$route.query.id).then(()=>{
                    this.detail.likeStatus = 0
                    this.detail.likeCount -= 1
                    this.$toast('已取消！')
                }).catch(()=>{
                    this.$toast('失败！')
                })
            }
            // 鉴定为已点赞，需要调用取消点赞接口

        },
        //收藏或者不收藏该笔记，弹出收藏夹
        collect(){
            // 已经收藏，调用取消收藏接口
            if(this.detail.markStatus){
                this.$confirm('确定要取消收藏吗', '取消收藏', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true,
                    showClose:false
                }).then(()=>{
                    cancelNoteMark(this.$route.query.id).then(()=>{
                        this.detail.markStatus = 0
                        this.detail.markCount -= 1
                    })
                })
            }else{ // 未收藏，打开收藏夹，选择一个收藏
                mark().then(res=>{
                    this.allCollection = res.data.data
                    this.isShowCollect = true
                })
            }

        },
        //添加到收藏夹
        addToCollection(areaName,index){
            addNoteMark(this.$route.query.id,areaName).then(()=>{
                this.detail.markCount += 1
                this.allCollection[index].noteCount += 1
                this.detail.markStatus = 1
                this.$toast('收藏成功！')
                this.isShowCollect = false
            }).catch(()=>{
                this.isShowCollect = false
                this.$toast('收藏失败！')
            })
        },



        //发表评论
        sendComments(){
            // 处于文章的详情页下，发表评论则会在文章下面发表
            // 发送增加评论的请求l
            let tempCom = this.comment
            this.comment = ''
            if(tempCom === ''){
                this.$toast('评论内容不能为空');
                return;
            }
            sendComment(this.$route.query.id,tempCom).then(res =>{
                let Com = {
                    id:res.data.data,
                    childComment:'',
                    content:tempCom,
                    createTime:'刚刚',
                    likeCount:0,
                    likeStatus:0,
                    childCount:0,
                    userId:localStorage.getItem('id'),
                    name:localStorage.getItem('name'),
                    userHead:localStorage.getItem('userHead')
                }
                if(this.sortByTime){
                    this.haveComment.unshift(Com)
                    this.$toast('发表成功');
                }else{
                    this.haveComment.push(Com)
                    this.$toast('发表成功');
                }
            }).catch(() => {
                // 发送失败
                this.$toast('发表失败');
            })
        },
        //发表子评论
        sendChildComments(){
            let tempCom = this.childComment
            this.childComment = ''
            if(tempCom === ''){
                this.$toast('评论内容不能为空');
                return;
            }
            sendCommentChild(this.nowFatherId,tempCom).then(res =>{
                let Com = {
                    id:res.data.data,  //众所周知，id只有在上传评论成功后从后端请求获得，因此本地静态生成的id为null，独一无二，方便判断该笔记是不是静态生成的
                    content:tempCom,
                    createTime:'刚刚',
                    likeCount:0,
                    likeStatus:0,
                    userId:localStorage.getItem('id'),
                    name:localStorage.getItem('name'),
                    userHead:localStorage.getItem('userHead')
                }
                this.moreCommentChild.unshift(Com)
                if(this.haveComment[this.moreCommentIndex].childComment.length < 3){
                    this.haveComment[this.moreCommentIndex].childComment.unshift(Com)
                }
                this.$toast('发表成功');
            }).catch(()=>{
                this.$toast('发表失败');
            })
        },
        // 点击查看更多评论（二级评论）
        lookMoreComment(id,index){
            this.$loading('加载中...')
            this.nowFatherId = id
            this.moreCommentIndex = index
            getCommentChild(id).then(res =>{
                this.moreCommentChild = res.data.data
                this.$loading.close();
                this.dialogVisible = true
            })
        },
        //删除我的评论
        deleteMyComment(index,id){
            // 静态删除评论
            this.$confirm('确定要删除评论吗', '删除评论', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                showClose:false
            }).then(() => {
                deleteCommentById(id).then(() =>{
                    if(this.dialogVisible === true){
                        // 窗口已打开则表示删除的是二级评论里的评论
                        this.moreCommentChild.splice(index,1)
                        this.$toast('成功删除评论');
                    }else{
                        this.haveComment.splice(index,1)
                        this.$toast('成功删除评论');
                    }
                })
            }).catch(() => {

            });
        },
        // 点击点赞评论 或取消点赞评论
        clickLike(index,id){
            // 鉴定为主页上的评论
            if(this.dialogVisible === false){
                // 鉴定为还未点赞，需要调用点赞接口
                    if(this.haveComment[index].likeStatus === 0){
                    likeComment(id).then(()=>{
                        this.haveComment[index].likeStatus = 1
                        this.haveComment[index].likeCount += 1
                        this.$toast('赞!');
                    }).catch(() => {
                        this.$toast('点赞失败!');
                    })
                }
                else{
                    dislikeComment(id).then(() => {
                        this.haveComment[index].likeStatus = 0
                        this.haveComment[index].likeCount -= 1
                        this.$toast('已取消!');
                    }).catch(()=>{
                        this.$toast('失败!');
                    })
                }
            }
            // 鉴定为已经打开某个评论内的二级评论
            else{
                // 鉴定为还未点赞，需要调用点赞接口
                if(this.moreCommentChild[index].likeStatus === 0){
                    likeComment(id).then(()=>{
                        this.moreCommentChild[index].likeStatus = 1
                        this.moreCommentChild[index].likeCount += 1
                        this.$toast('赞!');
                    }).catch(() => {
                        this.$toast('点赞失败!');
                    })
                }else{
                    dislikeComment(id).then(() => {
                        this.moreCommentChild[index].likeStatus = 0
                        this.moreCommentChild[index].likeCount -= 1
                        this.$toast('已取消!');
                    }).catch(()=>{
                        this.$toast('失败!');
                    })
                }
            }
        },

        // 关闭二级评论弹窗
        closeMoreComment(){
            this.moreCommentIndex = this.childComment = this.moreCommentChild = this.nowFatherId = ''
        },

        // 时间转化之术
        timeFormat(time) {
            let nowTime = new Date();
            let day = nowTime.getDate();
            let hours = parseInt(nowTime.getHours());
            let minutes = nowTime.getMinutes();
            // 开始分解付入的时间
            let timeDay = time.substring(8, 10);
            let timeHours = parseInt(time.substring(11, 13));
            let timeMinutes = time.substring(14, 16);
            let d_day = Math.abs(day - timeDay);
            let d_hours = hours - timeHours;
            let d_minutes = Math.abs(minutes - timeMinutes);
            if (d_day <= 1) {
                switch (d_day) {
                    case 0:
                        if (d_hours === 0 && d_minutes > 0) {
                            return d_minutes + '分钟前';
                        } else if (d_hours === 0 && d_minutes === 0) {
                            return '1分钟前';
                        } else {
                            return d_hours + '小时前';
                        }
                    case 1:
                        if (d_hours < 0) {
                            return (24 + d_hours) + '小时前';
                        } else {
                            return d_day + '天前';
                        }
                }
            } else if (d_day > 1 && d_day < 10) {
                return d_day + '天前';
            } else {
                return time;
            }
        },

        // 关注用户 或取关用户
        clickFollow(userId){
            // 此时是已关注状态，点击取消关注
            if(this.detail.fanStatus){
                disFollowUser(userId).then(()=>{
                    this.detail.fanStatus -= 1
                    this.$toast('已取消关注')
                })
            }else{ // 未关注状态，点击关注
                followUser(userId).then(()=>{
                    this.detail.fanStatus += 1
                    this.$toast('成功关注')
                })
            }
        },

        // 点击用户的头像跳转到用户详情页
        goToUserDetail(id){
            this.$router.push({
                path:'./userInfo',
                query:{id:id}
            })
        }

    },
    created() {
        this.isLoading = true
        this.userId = localStorage.getItem('id')
        getShareNoteById(this.$route.query.id).then(res => {
            this.detail = res.data.data
            this.isLoading = false
        })
        getCommentByLike(this.$route.query.id).then(res =>{
            this.haveComment = res.data.data
        })

    },

}
</script>




<style scoped>
    #shareNote>>>.el-textarea__inner{
        border: 0;
        resize: none;
    }
    .back{
        display: flex;
        height: 3rem;
        width: 100%;
        background-color: var(--color-theme);
        margin-bottom: 0.5rem;
        color: white;
        font-size: 1.5rem;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .back >i{
        flex: 1;
        display: block;
        box-sizing: border-box;
        line-height: 3rem;
        padding-left: 1rem;
    }
    .back > div:nth-child(2){
        flex: 4;
        position: relative;
        padding-left: 4rem;
        line-height: 3rem;
        font-size: 1rem;
    }
    .back > div:nth-child(3){
        flex: 2;
        position: relative;
    }
    .attention{
        text-align: center;
        width: 4rem;
        font-size: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .userHead{
        width: 2.3rem;
        height: 2.3rem;
        position: absolute;
        top: 50%;
        left: 6%;
        transform: translate(0,-50%);
        border-radius: 50%;
    }
    .title{
        margin-top: 3rem;
        height: 4rem;
        text-align: center;
        line-height: 4rem;
        color: var(--color-theme);

    }
    .picture{
        position: relative;
        border-radius: 0;
        display: block;
        width: 70%;
        height: 10rem;
        margin: 0 auto 1rem;
    }
    .shareNoteTab{
        height: 3rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--color-theme);
        display: flex;
    }
    .comment{
        flex: 6;
        position: relative;
    }
    .shareNoteTab .el-input{
        width: 80%;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .comment >>> .el-input__inner{
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: white solid 3px;
        background-color: var(--color-theme);
        color: white;
        font-size: 0.9rem;
        text-align: center;
    }
    ::v-deep .el-input__icon{
        color: white;
    }
    .comment i{
        line-height: 2.6rem;
        color: white;
    }
    .like{
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction:column;
    }
    .likeIcon{
        height: 60%;
        line-height: 2.1rem;
    }
    .collect{
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction:column;
    }
    .collectIcon{
        height: 60%;
        line-height: 2.1rem;
    }
    .count{
        height: 40%;
        font-size: 0.7rem;
        line-height: 0.9rem;
        color: #ffdede;
        font-weight: 900;
    }
    .iconfont{
        font-size:1.5rem ;
        color: white;
    }

    .sort{
        font-size: 0.5rem;
        color: rgb(152, 162, 170);
        margin: 0 2rem;
        display: flex;
    }
    .sort div:nth-child(1){
        flex: 4.5;
        text-align: left;
    }
    .sort div:nth-child(2){
        flex: 1;
        text-align: right;
    }
    .showComment{
        margin-bottom: 4rem;
    }
    .showIcon{
        width: 4rem;
        font-size: 0.6rem;
        color: rgb(152, 162, 170);
        margin: 1rem auto 0;
        text-align: center;
    }
    .showIcon > i{
        color: rgb(152, 162, 170);
        line-height: 1rem;
    }
    .stepOne div:nth-child(1){
        flex: 1;
        width: 2rem;
        height: 2rem;
    }
    .stepOne img{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }
    .stepOne div:nth-child(2){
        flex: 9;
        padding-left: 0.6rem;
        padding-top: 0.3rem;
    }
    .stepOne div:nth-child(3){
        flex: 9;
        padding-top: 0.3rem;
        text-align: right;
        padding-right: 0.3rem;
        color: rgb(152, 162, 170);
    }
    .fg{
        background-color: var(--color-theme);
    }
    ::v-deep .el-dialog__body{
        padding: 0;
    }
    .inDialog{
        /*position: relative;*/
        overflow: scroll;
    }
    .isLast{
        padding-bottom: 2.5rem;
    }
    .inDialog .el-input{
        box-sizing: border-box;
        text-align: center;
        position: absolute;
        bottom: -2.5rem;
        left: 0;
        right: 0;
        background-color: var(--color-theme);
    }
    ::v-deep .el-input__inner::placeholder{
        color: #e5dddd;
    }

    .inDialog i{
        font-size: 1.3rem;
        color: white;
        line-height: 3rem;
    }
    .inDialog >>> .el-input__inner{
        width: 80%;
        border:none;
        background-color: var(--color-theme);
        color: white;
        font-size: 0.9rem;
        text-align: center;
        border-radius: 0;
        margin-bottom: 0.3rem;
        border-bottom: 3px solid white;
    }
    .setHeightOne{
        min-height: 6.4rem;
    }
    .setHeightTwo{
        min-height: 12.8rem;
    }
    .setHeightThree{
        min-height: 19.2rem;
    }
    .loading{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 11;
        background-color: white;
        overflow: hidden;
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
