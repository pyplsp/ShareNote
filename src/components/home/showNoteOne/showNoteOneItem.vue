<template>
    <div id="item">
            <div id="inline" @click = "goto()">
                <img @load="imgLoaded" :src="imageSrc" alt="">
                <div><strong>{{ title }}</strong><i class="el-icon-error" @click.stop = "changeCenterDialogVisible"></i></div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'showNoteOneItem',
    props: ['imageSrc', 'title',],
    methods:{
        goto(){
            this.$emit('goto')
        },
        changeCenterDialogVisible(){
            this.$emit('showDialog')
        },
        imgLoaded(){
            this.$emit('imgLoaded')
        }
    }
}
</script>

<style scoped>
    #item {
        width: 50%;
        box-sizing: border-box;
        padding: 1.8rem;
        text-align: center;
        margin-bottom: 0;
    }
    #inline {
        position: relative;
        width: 100%;
        height: 90%;
        border-radius: 10px;
        border: 1px solid #edeff5;
    }
    #inline > img {
        object-fit: cover;
        border-radius: 10px 10px 0 0;
        width: 100%;
        height: 7rem;
        border: 0;
        z-index: 2;
    }
    img:not([src]){
        opacity:0;
    }
    img:after{

    }
    #inline > div {
        position: relative;
        height: 2.5rem;
        width: 100%;
        line-height: 1.2rem;
        color: var(--color-theme);
    }
    .el-icon-error{
        display: block;
        position: absolute;
        top: 0.15rem;
        right: 0.2rem;
    }
</style>
