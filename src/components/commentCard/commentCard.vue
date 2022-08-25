<template>
    <div>
        <el-card class="content" shadow="never" >
            <!--      一级评论内容          -->
            <div class="stepOne">
                <div><slot name="userHead"></slot></div>
                <div><slot name="userName"></slot></div>
                <div><slot name="createTime"></slot></div>
            </div>
            <div class="stepOneContent">
                <slot name="content"></slot>
            </div>
            <div class="tab" v-if="ifShowTab">
                <!--     点赞图标，包括激活状态与未激活状态      -->
                <i @click = "clickLk" v-if="ifLike" class="iconfont py-like" :style="{color:theme}">
                    <span :style="{color:theme}"> {{likeCounts}}</span>
                </i>
                <i @click = "clickLk" v-else class="iconfont py-like" :style="{color:boBo}">
                    <span :style="{color:theme}"> {{likeCounts}}</span>
                </i>
                <!--       删除图标         -->
                <i
                    :style="{color:theme}"
                    @click="clickDe"
                    v-show="ifShowDelete"
                    class="el-icon-delete-solid">
                </i>
            </div>
            <div class="stepTwo" :style="{backgroundColor:ifShowBackGround ? '#fcf7f7' : ''}">
                <!--  二级评论中的每个用户用户名以及评论  -->
                <div :class="{'havaC':ifShowLookMoreAndComment}" :style="{color:theme}">
                    <div class="inContent" v-for="item in childContent"
                    >
                        <span>{{item.name}}:</span><span>{{item.content}}</span>
<!--                        {{item.name + item.content}}-->
                    </div>
                    <div>
                        <span v-show="ifShowLookMoreAndComment" @click="clickLM">{{LookMoreAndCommentText}}</span>
                    </div>
                </div>
            </div>
            <div style="border-bottom:1px solid rgb(229, 233, 239);margin-top: 1rem"></div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "commentCard",
    props:{
        // 主题色
        theme:String,
        // 子评论数
        childContent:Array,
        // 是否展示删除图标  （图标为主题色）
        ifShowDelete:Boolean,
        // 是否展示 评论 / 查看更多
        ifShowLookMoreAndComment:Boolean,
        // 评论 / 查看更多的具体文字，比如 我要评论 / 查看更多20条评论
        LookMoreAndCommentText:String,
        // 未激活主题色
        boBo:String,
        // 是否显示中间格兰：点赞以及删除
        ifShowTab:Boolean,
        // 是否激活的状态码，0未激活，0激活
        ifLike:Number,
        // 被点赞的总次数
        likeCounts:Number,
        // 是否显示子评论的背景颜色（默认为灰色）
        ifShowBackGround: {
            type:Boolean,
            default:true
        }
    },
    methods:{
        // 点击 删除评论行为
        clickDe(){
            this.$emit('clickDelete')
        },
        // 点击 评论 / 查看 更多行为
        clickLM(){
            this.$emit('LookMoreAndComment')
        },
        // 点击 点赞行为
        clickLk(){
            this.$emit('like')
        },
    },

}
</script>

<style scoped>
    .content{
        margin: 0.7rem 1rem 0;
        border: none;
        /*border-bottom: #e1e7f3 1px solid;*/
    }
    .stepOne{
        font-size: 0.5rem;
        vertical-align:middle;
        display: flex;
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
        flex: 6;
        padding-left: 0.6rem;
        padding-top: 0.3rem;
    }
    .stepOne div:nth-child(3){
        flex: 9;
        padding-top: 0.3rem;
        text-align: right;
        padding-right: 0.3rem;
        color: rgb(144, 147, 153);
    }
    .stepOneContent{
        padding-left: 2.5rem;
        font-size: 0.5rem;
    }
    .stepTwo{
        margin-left: 2.5rem;
        margin-top: 0.5rem;
        font-size: 0.5rem;
        margin-bottom: 0.3rem;
    }
    .stepTwo span:nth-child(1){
        margin-right: 0.5rem;
        white-space:nowrap;
    }
    .stepTwo span:nth-child(2){
        color: black;
    }
    .tab{
        display: flex;
        margin-top: 1rem;
        text-align: right;
        margin-bottom: 0.5rem;
    }
    .tab i:nth-child(1){
        flex: 1;
        text-align: left;
        padding-left: 2.5rem;
        font-size: 0.4rem;
    }
    .tab i:nth-child(2){
        flex: 1;
        text-align: right;
        font-size: 0.4rem;
    }
    ::v-deep .el-card__body {
        padding: 0.1rem 1rem 0rem 1rem;
    }
    .havaC{
        padding:0.5rem;
    }
    .inContent{
        margin-bottom:0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
    .floor{
        font-size: 0.3rem;

    }
</style>
