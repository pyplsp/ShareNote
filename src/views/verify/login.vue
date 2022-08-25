<template>
    <div>
        <div class="background"></div>
        <div class="changeIcon">
            <i class="el-icon-s-unfold" @click = "goToRegister"></i>
        </div>
        <el-card shadow="hover">
            <el-input placeholder="请输入用户名" prefix-icon = "el-icon-user-solid" v-model="username"></el-input>
            <br /><br />
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" show-password></el-input>
            <br /><br />
            <el-button type="primary" icon="el-icon-s-promotion" @click = "submit()">登录</el-button>
        </el-card>
    </div>
</template>

<script>

import {login,refresh} from "@/network/verify";
export default {
    name: "login",
    components:{
    },
    data(){
        return {
            // 用户名密码
            username:'',
            password:'',

            //开关的值
            switch1:false,
        }
    },
    methods:{
        submit(){
            login(this.username,this.password).then(
                res => {
                    // 保存token
                    let userData = res.data.data
                    localStorage.setItem('token',userData.token)
                    localStorage.setItem('id',userData.id)
                    localStorage.setItem('name',userData.name)
                    localStorage.setItem('userHead',userData.userHead)
                    localStorage.setItem('birthday',userData.birthday)
                    localStorage.setItem('motto',userData.motto)
                    this.$router.replace('/home')
                    this.$toast('登录成功!')
                }
            ).catch(res => {
                this.$toast('登录失败!')
            })
        },
        goToRegister(){
            this.$router.replace('/register')
        }
    },
}
</script>

<style scoped>
    .el-card{
        width: 70%;
        margin: 12rem auto;
        position: relative;
    }
    .el-button{
        display: block;
        margin: 0 auto;
    }
    .changeIcon{
        width: 3rem;
        font-size: 2rem;
        color: var(--color-theme);
        position:fixed;
        margin:0 auto;
        top: 9rem;
        left:0;
        right:0;
    }
    .background{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-image: url("~assets/img/loginBackgorund.png");
        background-size: 100% 100%;
    }
</style>
