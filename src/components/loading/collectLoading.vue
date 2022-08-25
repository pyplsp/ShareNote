<template>
    <div v-show="show">

    </div>
</template>

<script>
export default {
    name: "collectLoading",
    props:{
        show:{
            default:true,
            type:Boolean
        }
    }
}
</script>

<style scoped>

</style>
