<template>
    <div>
        <!-- 导航栏 -->
        <home-nav
            :classify="allAreaName"
            :now-classify="nowClassify"
            @getAllAreaNameDate="getAllAreaName"
            @getAreaName = "getAreaName"
            @getSearchContent = "getSearchContent"
            class="home-nav"
        />

        <div class="showFrame" ref="scroll">
            <div class="showA">
                <!-- 加载字样 -->
                <div class="pulldown-wrapper">
                    <div>
                        <span v-show="beforePullDown">上拉刷新</span>
                        <span v-show="isPullingDown">
                                加载中 <i class="el-icon-loading"></i>
                            </span>
                    </div>
                </div>
                <!-- 加载动画 -->
                <home-loading :show="isLoading"></home-loading>
                <!-- 笔记内容展示 -->
                <show-note-one-item
                    v-show="!isLoading"
                    v-for="(item,index) in articleData"
                    :image-src = "item.noteImage"
                    :title = "item.title"
                    :key = "item.id"
                    @showDialog="theShowDialog(item.id,item.title,index)"
                    @goto="gotoDetail(item.id)"
                    @imgLoaded="MonitorImg"
                />
            </div>
        </div>

        <!--确定删除的弹出框 -->
        <el-dialog title="是否删除" :visible.sync="ifShowDialog" width="17rem" :show-close = "false" center>
            <span><strong style="color: var(--color-theme)">{{shouldBeDeleteNote.title}}</strong></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ifShowDialog = false">取 消</el-button>
                <el-button type="primary" @click="confirmDeleteNote">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 用于添加文章的悬浮按钮 -->
        <float-button @add="goToAdd"></float-button>

        <!-- 底部导航栏 -->
        <tabbar :path="path" :isActive="home"></tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/tabbar/tabbar.vue'
import HomeNav from '@/components/home/homeNav/homeNav.vue'
import showNoteOneItem from "@/components/home/showNoteOne/showNoteOneItem";
import FloatButton from "@/components/home/floatingButton/floatButton";
import homeLoading from "@/components/loading/homeLoading";
import {notes,search,searchByArea,onlyAreaName,deleteNote} from "@/network/contentData";

// better-scroll 相关
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import PullUp from '@better-scroll/pull-up'
BScroll.use(PullUp)
BScroll.use(PullDown)

export default {
    name:'home',
    inject:['reload'],
    data() {
        return {
            // better scroll 实例
            bs:'',

            // 固定数据
            home: 'home',
            path: ['/home', '/share', '/message', '/user'],

            // 主页内容的简介，包含id, 封面, title
            articleData: [],
            allArea:'',

            //记住当前在哪个分类
            nowClassify:'',
            isLoading:true,

            // 保存所有的分区名字
            allAreaName:[],

            // 展示是否删除的弹框
            ifShowDialog:false,

            // 展示删除弹框之后当前的文章标题,id 以及 index
            shouldBeDeleteNote:{
                id:'',
                title:'',
                index:''
            },

            // 上拉刷新相关标志位
            beforePullDown: true,
            isPullingDown: false,
        }
    },
    // 重中之重,在删除某一篇文章的时候,滚动插件的子元素高度变化,因此需要在数据更新钩子重新刷新滚动
    updated() {
        this.bs.refresh()
    },
    activated() {
        this.bs.refresh();
        if(this.$store.state.noteStatus === true){
            this.isLoading = true
            notes().then(res =>{
                this.articleData = res.data.data
                this.isLoading = false
            })
            this.$store.commit('changeNoteStatus')
        }
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
    methods:{
        goToAdd(){
            this.$router.push({
                path:'/newNote',
            });
        },
        gotoDetail(id){
            this.$router.push({
                path:'/note',
                query:{id:id}
            })
        },
        // 网络请求所有的分区
        getAllAreaName(){
            onlyAreaName().then(res =>{
                this.allAreaName = res.data.data
            })
        },
        // 搜索事件 ：获取到 搜索的内容
        getSearchContent(text){
            // 倘若有搜索内容就执行搜索获取内容
            if (text !== ''){
                this.isLoading = true
                search(text).then(res =>{
                    this.articleData = res.data.data
                    this.isLoading = false
                    this.$toast('搜索结果：' + text)
                }).catch(()=>{
                    this.isLoading = false
                    this.$toast('数据获取失败')
                })
            }
        },
        // 选择分类事件：获取到分类的内容
        getAreaName(area){
            if(area === this.nowClassify){
                this.$toast('您已在 ' + area )
                return
            }
            this.isLoading = true
            if (area === '全部'){
                notes().then(res =>{
                    this.nowClassify = '全部'
                    this.articleData = res.data.data
                    this.isLoading = false
                    this.$toast('成功获取全部数据')
                }).catch(()=>{
                    this.isLoading = false
                    this.$toast('数据获取失败')
                })
            }else{
                searchByArea(area).then(res =>{
                    this.nowClassify = area
                    this.articleData = res.data.data
                    this.isLoading = false
                    this.$toast('成功获取分区  ' + area + '  数据')
                }).catch(()=>{
                    this.isLoading = false
                    this.$toast('数据获取失败')
                })
            }
        },
        theShowDialog(id,title,index){
            this.ifShowDialog = true
            this.shouldBeDeleteNote.id = id
            this.shouldBeDeleteNote.title = title
            this.shouldBeDeleteNote.index = index
        },
        // 删除确认
        confirmDeleteNote(){
            let item = this.shouldBeDeleteNote
            deleteNote(item.id).then(()=>{
                this.$toast('删除成功')
                this.articleData.splice(item.index,1)
                // 删除文章会导致内容区域变短，需要刷新滚动插件
                this.ifShowDialog = false
            }).catch(()=>{
                this.$toast('删除失败')
                this.ifShowDialog = false
            })
            this.shouldBeDeleteNote = {}
        },

        // ---------------------------------------   刷新有关    --------------------------------------------
        MonitorImg(){
            this.bs.refresh();
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
            if(this.nowClassify === '全部'){
                notes().then(res =>{
                    this.articleData = ''
                    this.articleData = res.data.data
                    this.afterRefresh(1)
                }).catch(()=>{
                    this.afterRefresh(0)
                })
            }else{
                searchByArea(this.nowClassify).then(res =>{
                    this.articleData = res.data.data
                    this.afterRefresh(1)
                }).catch(()=>{
                    this.afterRefresh(0)
                })
            }
        },
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
    },
    created() {
        this.isLoading = true
        notes().then(res =>{
            this.articleData = res.data.data
            this.isLoading = false
        })
        this.nowClassify = '全部'
    },
    components: {
        FloatButton,
        Tabbar,
        HomeNav,
        showNoteOneItem,
        homeLoading,
    }
}
</script>

<style scoped>
    .home-nav {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 10;
    }
    .showFrame{
        height: calc(100vh - 7.5rem);
        /*position: relative;*/
        margin-top: 3.75rem;
        margin-bottom: 3.75rem;
        overflow: hidden;
        width: 100%;
    }
    .showA{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
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
    ::v-deep .el-dialog--center .el-dialog__body{
        text-align: center;
    }
</style>
