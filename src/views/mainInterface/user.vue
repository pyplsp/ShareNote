<template>
    <div>
        <!--   顶部LOGO    -->
        <user-nav class="LOGO">
            <img style="width: 21%;height: 50%;" slot="center" src="@/assets/img/LOGO.png">
        </user-nav>

        <!--    用户简介区：包括 头像，名字，简介    -->
        <div class="content">
            <!--     用户个人简要信息       -->
            <user-info
                :intro="info.motto"
                :line-clamp = 4
            >
                <img style="width: 4rem;height: 4rem;border-radius: 50%" slot="head" :src="info.userHead" alt="">
                <span slot="name">{{info.name}}</span>
                <i slot="icon" class="el-icon-edit-outline" @click="editorMyInfo"></i>
            </user-info>
        </div>

        <!--   用户详情信息：包括 关注，粉丝，文章数     -->
        <user-detail-info v-if="info.fans !== ''">
            <p slot="fans">{{info.fans}}</p>
            <p slot="followers">{{info.following}}</p>
            <p slot="articles">{{info.noteCounts}}</p>
        </user-detail-info>
        <user-detail-info v-else v-loading="true">
            <p slot="fans"><i class="el-icon-loading"></i></p>
            <p slot="followers"><i class="el-icon-loading"></i></p>
            <p slot="articles"><i class="el-icon-loading"></i></p>
        </user-detail-info>

        <!--   用户各项设置1：我的收藏，我的分区，点赞过的文章     -->
        <setting-frame class="settingOne">
            <setting-item
                v-for="(item,index) in settingOne"
                :key="index"
                :data=item
                :index="'1-' + index"
                @beClick = "clickSetting"
                :background-color="(index % 2)=== 0 ? '' : '#fddcdc'"
            />
        </setting-frame>

        <!--   用户各项设置2：设置，关于     -->
        <setting-frame class="settingTwo">
            <setting-item
                v-for="(item,index) in settingTwo"
                :key="index"
                :data=item
                :index="'2-' + index"
                @beClick = "clickSetting"
                :background-color="(index % 2) !== 0 ? '' : '#fddcdc'"
            />
        </setting-frame>

        <!--   用户各项设置3：退出登录     -->
        <setting-frame class="settingTwo">
            <setting-item
                v-for="(item,index) in settingThree"
                :key="index"
                :data=item
                :index="'3-' + index"
                @beClick = "clickSetting"
                :background-color="(index % 2) !== 0 ? '' : '#fddcdc'"
            />
        </setting-frame>

        <!--   底部导航     -->
        <div style="margin-bottom: 3rem"></div>
        <tabbar :path="path" :isActive="user"></tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/tabbar/tabbar.vue'
import userNav from "@/components/user/userNav";
import userInfo from "@/components/user/userInfo";
import userDetailInfo from "@/components/user/userDetailInfo";
import settingFrame from "@/components/user/setting/settingFrame";
import settingItem from "@/components/user/setting/settingItem";
import {getMyInfo} from "@/network/contentData";
export default {
    data() {
        return {
            user: 'user',
            path: ['/home', '/share', '/message', '/user'],
            // 用户个人信息
            info:{
                userHead:'',
                name:'',
                motto:'',
                following:'',
                fans:'',
                noteCounts:'',
            },

            // 设置项
            settingOne:[
                ['我的收藏','<i class="el-icon-s-opportunity"></i>','#FFF68F'],
                ['我的分区','<i class="el-icon-menu"></i>','#a6e7c0'],
                ['点赞过的笔记','<i class="el-icon-s-claim"></i>','#fa9898'],
            ],
            settingTwo:[
                ['设置','<i class="el-icon-s-tools"></i>','#909399'],
                ['联系作者','<i class="el-icon-more"></i>','#909399'],
            ],
            settingThree:[['退出登录','<i class="el-icon-error"></i>','#f4aeaf'],]
        }
    },
    methods:{
        // 编辑个人信息，跳转到编辑页
        editorMyInfo(){
            this.$router.push({
                path:'./editor'
            })
        },
        clickSetting(index){
            switch (index){
                // 点击我的收藏
                case '1-0':
                    this.$router.push('./collection')
                    break
                // 点击我的分区
                case '1-1':
                    this.$router.push('./myArea')
                    break
                // 点击点赞过的文章
                case '1-2':
                    this.$router.push('./myLike')
                    break
                // 跳转到设置界面
                case '2-0':
                    this.$toast('暂未开发...')
                    break
                // 跳转到反馈界面
                case '2-1':
                    this.$router.push('./feedBack')
                    break
                // 点击退出登录
                case '3-0':
                    this.$confirm('是否退出登录？', '退出登录', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        center: true,
                        showClose:false
                    }).then(() => {
                        localStorage.clear()
                        this.$router.replace('/login')
                    }).catch(() => {

                    });
                    break;
            }
        },
        // 从存储中获取用户信息
        getItemFromStorage(){
            this.info.userHead = localStorage.getItem('userHead')
            this.info.name = localStorage.getItem('name')
            this.info.motto = localStorage.getItem('motto')
        },
        // 网络请求关注，粉丝和文章数据量
        getMyInfo1(){
            getMyInfo().then(res =>{
                this.info.fans = res.data.data.fans
                this.info.following = res.data.data.following
                this.info.noteCounts = res.data.data.notesCount
            })
        },

    },
    created() {
        this.getItemFromStorage()
        // 请求用户的账户信息，但是只要粉丝数，关注数量以及笔记数量
        this.getMyInfo1()
    },
    activated() {
        if(this.$store.state.userStatus === true){
            this.getItemFromStorage()
            this.$store.commit('changeUserStatus')
        }
        this.getMyInfo1()
    },
    components: {
        Tabbar,
        userNav,
        userInfo,
        userDetailInfo,
        settingFrame,
        settingItem,
    }
}
</script>

<style scoped>
    .LOGO{
        position: fixed;
        top: 0;
    }
    .content{
        margin-top: 4rem;
    }
    .settingOne{
        border-bottom: white 1rem solid;
    }
    .settingTwo{
        border-bottom: white 1rem solid;
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
