<template>
  <div>
    <el-menu mode="horizontal">

      <el-menu-item index="1" @click="home()">
        <!-- 活跃 -->
        <i v-if = "isActive === 'home'" class="el-icon-s-order" style="color: #F79E9E;"></i>
        <!-- 不活跃 -->
        <i v-else class="el-icon-s-order"></i>
      </el-menu-item>

      <el-menu-item index="2" @click="share()">
        <!-- 活跃 -->
        <i v-if = "isActive === 'share'" class="el-icon-share" style="color: #F79E9E;"></i>
        <!-- 不活跃 -->
        <i v-else class="el-icon-share"></i>
      </el-menu-item>

      <el-menu-item index="3" @click="message()">
        <!-- 活跃 -->
        <i v-if = "isActive === 'message'" class="el-icon-message-solid active" style="color: #F79E9E;"></i>
        <!-- 不活跃 -->
        <i v-else class="el-icon-message-solid"></i>
      </el-menu-item>

      <el-menu-item index="4" @click="user()">
        <!-- 活跃 -->
        <i v-if = "isActive === 'user'" class="el-icon-user-solid active" style="color: #F79E9E;"></i>
        <!-- 不活跃 -->
        <i v-else class="el-icon-user-solid"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "tabbar",
    data() {
      return {
      }
    },
    props:['path','isActive'],
    methods: {
      home(){
        if (this.$route.path != this.path[0])
          this.$router.push(this.path[0]);
      },
      share(){
        if (this.$route.path != this.path[1])
          this.$router.push(this.path[1]);
      },
      message(){
        if (this.$route.path != this.path[2])
          this.$router.push(this.path[2]);
      },
      user(){
        if (this.$route.path != this.path[3])
          this.$router.push(this.path[3]);
      }
    },
  }
</script>

<style scoped>
    .el-menu{
        display: flex;
        justify-content: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .el-menu-item{
        flex-grow: 1;
        text-align: center;
        border-bottom: none;

    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border-bottom: none;
        color: #909399;
    }
    .el-menu-item >i{
        font-size: 1.5rem;
    }
</style>
