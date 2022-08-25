<template>
    <div class="info">
        <div class="head">
            <slot name="head"></slot>
        </div>
        <div class="nameIntro">
            <div>
                <div style="
                    font-size: 1.5rem;
                    flex: 2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;"
                >
                    <strong><slot name="name"></slot></strong>
                </div>
                <div style="text-align: right;font-size: 1.5rem;flex: 1;padding-right: 1rem">
                    <slot name="icon"></slot>
                </div>
            </div>
            <div :style="{'-webkit-line-clamp':lineClamp}"><p style="">简介：{{intro}}</p></div>
        </div>

    </div>
</template>

<script>
export default {
    name: "userInfo",
    // props:['intro','lineClamp']
    props:{
        intro:{
            type:String,
            default:'这个人很懒，没有留下信息 ... ...'
        },
        lineClamp:{
            type:Number,
            default: 10
        }
    }
}

</script>

<style scoped>
    .info{
        min-height: 6rem;
        display: flex;
        width: 96%;
    }
    .head{
        width: 33%;
        line-height: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 6rem;
    }
    .nameIntro{
        width: 66%;
    }
    .nameIntro > div:nth-child(1){
        display: flex;
        margin-top: 0.7rem;
        margin-bottom: 0.2rem;
    }
    .nameIntro div:nth-child(2){
        margin: 0rem auto 0.7rem;
        font-size: 0.2rem;
        color: #908090;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
    }
</style>
