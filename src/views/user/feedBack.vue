<template>
    <div>
        <child-nav>
            <i @click="goToUser" slot="icon" class="el-icon-arrow-left"></i>
            <span slot="title">联系作者</span>
        </child-nav>

        <feed-back-com style="margin-top: 5rem">
            <img style="width: 4rem;height: 4rem;border: 1px solid #e6e6e6;border-radius: 50%" slot="iamge" src="@/assets/img/PY.jpg" alt="">
            <span slot="name">P Y</span>
            <span slot="line1">邮箱：2505730605@qq.mail</span>
            <span slot="line2">线下真人PK：惠州市惠城区</span>
            <span slot="line3">开发团队</span>
        </feed-back-com>
        <feed-back-com style="margin-top: 2rem">
            <img style="width: 4rem;height: 4rem;border: 1px solid #e6e6e6;border-radius: 50%" slot="iamge" src="@/assets/img/luyu.jpg" alt="">
            <span slot="name">鲈鱼</span>
            <span slot="line1">邮箱：753688295@qq.mail</span>
            <span slot="line2">开发团队</span>
        </feed-back-com>
    </div>
</template>

<script>
import childNav from "@/components/user/childNav";
import feedBackCom from "@/components/user/feedback/feedBackCom";
export default {
    name: "feedBack",
    methods:{
        goToUser(){
            this.$router.back()
        },
    },
    components:{
        childNav,
        feedBackCom
    }
}
</script>

<style scoped>

</style>
