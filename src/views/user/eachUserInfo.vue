<template>
    <div>
        <child-nav style="z-index: 10">
            <i @click="goToUser" slot="icon" class="el-icon-arrow-left"></i>
            <span slot="title">用户详情</span>
        </child-nav>
        <div class="content">
            <!-- 头像区域 -->
            <div>
                <div class="head">
                    <img class="imgInHead" :src="userData.userHead" alt="">
                </div>
            </div>

            <!-- 名字与关注 -->
            <div>
                <div class="name">{{ userData.name }}</div>
                <div class="focusOn">
                    <el-button v-show="!isMySelf" type="primary"  size="mini" @click="clickFollow">
                        {{ userData.followStatus ? '已关注':'关注'}}
                    </el-button>
                </div>
            </div>
            <!-- 其他详情:账号，生日，简介 -->
            <div>
                <el-descriptions :column = "2">
                    <el-descriptions-item label-class-name="table lableColor" content-class-name="table" label="用户名">
                        {{userData.username}}
                    </el-descriptions-item>
                    <el-descriptions-item label-class-name="table lableColor" content-class-name="table" label="生日">
                        {{userData.birthday}}
                    </el-descriptions-item>
                    <el-descriptions-item label-class-name="table lableColor" content-class-name="table" label="简介">
                        {{userData.motto}}
                    </el-descriptions-item>
                </el-descriptions>
            </div>

            <!-- 导航：个人笔记，点赞过，收藏过 -->
            <each-user-nav
                style="position: sticky;top: 3rem;z-index: 10"
                :item="['个人笔记','点赞过','收藏过']"
                :the-font-color="'var(--color-theme)'"
                @clickTheItem = isClick
            >
            </each-user-nav>

            <!--  -->
            <div>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>


        </div>
    </div>
</template>

<script>
import childNav from "@/components/user/childNav";
import userInfo from "@/components/user/userInfo";
import eachUserNav from "@/components/user/eachUserNav";
import {disFollowUser, followUser, getEachUserInfo} from "@/network/contentData";
export default {
    name: "eachUserInfo",
    data(){
        return{
            // 当前导航
            nowNav:0,
            // 用户个人信息
            userData:{},
        }
    },
    computed:{
        isMySelf(){
            return this.$route.query.id === localStorage.getItem('id')
        }
    },
    methods:{
        goToUser() {
            this.$router.back()
        },
        isClick(i){
            // 防止重复导航
            if(this.nowNav === i){
                return
            }
            // 根据index导航到不同位置
            switch (i) {
                case 0:
                    this.nowNav = i
                    this.$router.replace({
                        path:'/userInfo/article',
                        query:{id:this.$route.query.id}
                    })
                    break
                case 1:
                    this.nowNav = i
                    this.$router.replace({
                        path:'/userInfo/like',
                        query:{id:this.$route.query.id}
                    })
                    break
                case 2:
                    this.nowNav = i
                    this.$router.replace({
                        path:'/userInfo/collect',
                        query:{id:this.$route.query.id}
                    })
                    break
            }
        },
        clickFollow(){
            // 此时是已关注状态，点击取消关注
            if(this.userData.followStatus){
                disFollowUser(this.$route.query.id).then(()=>{
                    this.detail.fanStatus -= 1
                    this.$toast('已取消关注')
                })
            }else{ // 未关注状态，点击关注
                followUser(this.$route.query.id).then(()=>{
                    this.detail.fanStatus += 1
                    this.$toast('成功关注')
                })
            }
        },

    },
    created() {
        getEachUserInfo(this.$route.query.id).then(res=>{
            this.userData = res.data.data
        })
    },
    components:{
        userInfo,
        childNav,
        eachUserNav,
    },
}
</script>

<style scoped>
    .content{
        margin-top: 3rem;
    }
    .content > div:nth-child(1){
        width: 100%;
        height: 12rem;
        background-image: url("~assets/img/bgInUserInfo.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative
    }
    .head{
        width: 5.6rem;
        height: 5.6rem;
        position: absolute;
        left: 1rem;
        bottom: -2.7rem;
    }
    .imgInHead {
        width: 100%;
        height: 100%;
        object-fit:cover;
        border-radius: 50%;
    }
    .content > div:nth-child(2){
        margin-top: 3.5rem;
        display: flex;
    }
    .name{
        flex: 1;
        padding-left: 1.3rem;
        font-weight: 900;
        font-size: 1.3rem;
        letter-spacing: 0.06rem;
    }
    .focusOn{
        flex: 1;
        text-align: right;
        padding-right: 1.3rem;
    }
    .content > div:nth-child(3){
        width: 90%;
        margin: 1rem auto 1rem;
    }
    ::v-deep .el-descriptions__body {
        background-color: #faf8f8;
    }
</style>
<style>
    .table{
        background-color: #faf8f8;
    }
    .lableColor{
        color: var(--color-theme);
    }
</style>
