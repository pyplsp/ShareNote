<template>
    <div id="share">
        <!-- 顶部导航栏 -->
        <share-nav class="shareNav" @isSearch="judgeSearchStatus" ref="navInShare"></share-nav>

        <!--   搜索框，点击搜索按钮时呈现     -->
        <transition name="el-fade-in-linear">
            <el-input v-if="searchStatus" placeholder="请输入内容" v-model="searchContentCache"></el-input>
        </transition>

        <div class="pack">
            <!--   侧边导航     -->
            <div class="nav">
                <div v-for="(item,index) in AllShareTitles" class="navItem" @click ="changeTag(item,index)" :key = "index" :class="{'active':nowTagIndex === index}">
                    <strong>{{item}}</strong>
                </div>
            </div>


            <!--     内容区       -->
            <div class="content" ref="scroll">
                <div>
                    <div class="pulldown-wrapper">
                        <div>
                            <span v-show="beforePullDown">上拉刷新</span>
                            <span v-show="isPullingDown">
                                加载中 <i class="el-icon-loading"></i>
                            </span>
                        </div>
                    </div>
                    <share-loading :show = "isLoading"></share-loading>
                    <note-card
                        v-for="(item,index) in ContentByShareTag"
                        :key="index"
                        v-show="(searchContent === ''?true : item.title.search(searchContent) !== -1) && !isLoading"
                        @goGoGo="goToShareDetail(item.id)"
                        :is-show-point="item.content.length === 20"
                    >
                        <img style="width: 100%;height:100%;border-radius: 20%"
                             slot="image"
                             :src="item.noteImage"
                             @load="loadImage"
                             alt="图片无法显示">
                        <span slot="name">{{item.name}}</span>
                        <span slot="createTime">{{item.upTime ? item.upTime.split("T")[0] : ''}}</span>
                        <span slot="title">{{item.title}}</span>
                        <span slot="content">{{item.content}}</span>
                    </note-card>
                </div>
            </div>
        </div>

        <!-- 底部导航栏 -->
        <tabbar :path="path" :isActive="share"></tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/tabbar/tabbar.vue'
import shareNav from "@/components/share/shareNav/shareNav";
import noteCard from "@/components/noteCard/noteCard";
import shareLoading from "@/components/loading/shareLoading";
import {AllShareTitle,ShowContentByShareTag} from "@/network/contentData";

// better-scroll 相关
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import PullUp from '@better-scroll/pull-up'
BScroll.use(PullUp)
BScroll.use(PullDown)

export default {
    data() {
        return {
            // better scroll 实例
            bs:'',
            share: 'share',
            path: ['/home', '/share', '/message', '/user'],
            isPackUp:false,
            AllShareTitles:"",
            isCollapse:false,
            nowTag:"",  //当前所在的标签,默认界面打开时定位到历史标签
            nowTagIndex:0,
            ContentByShareTag:'',
            showErrorMessage:'', // 内容请求失败展示错误信息的定时器
            searchStatus:false,  // 搜索状态位，true时显示搜索框,false时不显示
            searchContent:'',  // 搜索的内容，为文章的标题
            searchContentCache:'',  //搜索的内容缓存，当点击搜索按钮时才赋予searchContent
            isLoading:true, // 是否显示加载骨架屏

            // 上拉刷新相关标志位
            beforePullDown: true,
            isPullingDown: false,
        }
    },
    components: {
        Tabbar,
        shareNav,
        shareLoading,
        noteCard
    },
    mounted() {
        this.bs = new BScroll(this.$refs.scroll, {
            disableTouch: false,
            probeType: 3,
            bounceTime:800,
            click:true,
            pullDownRefresh: true,
        })
        this.bs.on('pullingDown',this.pullingDownHandler)
    },
    created() {
        AllShareTitle().then(res =>{
            this.AllShareTitles = res.data.data
            // 将第一个标签自动为
            this.tag = res.data.data[0]
        })
        this.changeTag("历史",0)
    },
    activated() {
        this.bs.refresh();
    },
    methods:{
        changeTag(item,index) {
            if(item !== this.nowTag){
                this.isLoading = true
                this.nowTag = item
                this.nowTagIndex = index
                this.searchContent = this.searchContentCache = ''
                // 进行网络请求
                ShowContentByShareTag(item).then((res)=>{
                    this.ContentByShareTag = res.data.data;
                    this.isLoading = false
                }).catch((err)=>{
                    this.$toast('数据请求失败')
                    this.isLoading = false
                })
            }
        },
        judgeSearchStatus(searchStatus){
            this.searchStatus = searchStatus
            if(!this.searchStatus){
                this.searchContent = this.searchContentCache
            }
        },
        goToShareDetail(id){
            this.$router.push({
                path:'/shareNote',
                query:{
                    id:id
                }
            })
        },

        // ---------------------------------------   刷新有关    --------------------------------------------

        // 这个是为了解决better scroll的某些问题,指： 存在不确定尺寸的图片存在的bug
        // （详见：https://better-scroll.github.io/docs/zh-CN/FAQ/diagnosis.html）
        loadImage(){
            this.bs.refresh()
        },

        // 上拉到最顶部时触发事件（上拉过程中不触发）
        pullingDownHandler(){
            this.beforePullDown = false // beforePullDown 为true时显示 上拉刷新 字样
            this.isPullingDown = true // isPullingDown 为true时显示 加载中... 字样
            this.isLoading = true
            this.axiosAgain()
        },
        // 上拉触发网络请求
        axiosAgain(){
            ShowContentByShareTag(this.nowTag).then((res)=>{
                this.ContentByShareTag = res.data.data;
                this.afterRefresh(1)
            }).catch((err)=>{
                this.afterRefresh(0)
            })
        },

        // 刷新 成功/失败 做的事情
        afterRefresh(status){
            setTimeout(()=>{
                // 使上拉增加的空间弹回来，无论刷新成功失败都会回弹到正常状态
                this.bs.finishPullDown()
                // 上拉刷新结束回弹的时候不需要显示任何字样
                this.isPullingDown = this.beforePullDown = false
                // 这个是为了使下一次上拉刷新时，字样回归到初始状态，时间设与 bounceTime 一致
                setTimeout(()=>{
                    this.isPullingDown = false
                    this.beforePullDown = true
                },800)
                // 成功显示 刷新成功，失败时显示 数据请求失败
                if(status)
                    this.$toast('刷新成功')
                else
                    this.$toast('数据请求失败')
                this.isLoading = false
            },200)
        }
        // ------------------------------------------------------------------------------------------------------




    },
}
</script>

<style scoped>
    .shareNav{
        position: fixed;
        top: 0;
        z-index: 10;
    }
    .nav{
        width: 4rem;
        position: fixed;
        top: 3.8rem;
        left: 0;
        z-index: 10;
    }
    .el-input{
        z-index: 11;
        position: fixed;
        top: 3.8rem;
    }
    ::v-deep .el-input__inner{
        border:none;
        border-bottom: 2px solid var(--color-theme);
        border-radius:0;
    }
    .navItem{
        width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
        color: var(--color-theme);
        border-radius: 0 10px 10px 0;
    }
    .content{
        /*flex: 4;*/
        margin-left: 3.8rem;
        margin-bottom: 4.1rem;
        margin-top: 4.1rem;
        height: 35rem;
        overflow: hidden;
        position: relative;
    }
    .el-menu-item{
        color: var(--color-theme);
    }
    .nameAndTime > span:first-child{
        display: inline-block;
        flex: 1;
    }
    .nameAndTime > span:last-child{
        display: inline-block;
    }
    .active{
        background-color: var(--color-theme);
        color: white;
        opacity: 50%;
    }
    .pulldown-wrapper{
        position: absolute;
        width:100%;
        padding:20px;
        box-sizing:border-box;
        transform:translateY(-100%) translateZ(0);
        text-align:center;
        color:#999;
    }
</style>
