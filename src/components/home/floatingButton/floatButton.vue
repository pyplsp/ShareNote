<template>
    <div>
        <i @click.stop="goGo" class="el-icon-circle-plus"></i>
    </div>
</template>

<script>
export default {
    name: "floatButton",
    methods:{
        goGo(){
            this.$emit('add')
        }
    }
}
</script>

<style scoped>
    div{
        width: 3rem;
        height: 3rem;
        color: var(--color-theme);
        position: fixed;
        bottom: 9rem;
        right: 1.5rem;
        font-size: 3rem;
        opacity: 60%;
    }
</style>
