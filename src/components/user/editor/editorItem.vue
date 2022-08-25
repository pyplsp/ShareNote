<template>
    <div :style="{height:height,borderBottom:'solid 1px #e6e6e6',display:'flex'}">
        <div class="property" :style="{color:theme}">
            {{property}}
        </div>
        <div class="data" :style="{lineHeight:height}"><slot name="data"></slot></div>
    </div>
</template>

<script>
export default {
    name: "editorItem",
    props:['height','property','theme']
}
</script>

<style scoped>
    .property{
        padding-left: 2rem;
        width: 100%;
        flex: 1;
        font-weight: 900;
        display: flex;
        text-align: center;
        align-items: center;
        word-break: break-all;
        overflow-wrap: break-word;
    }
    .data{
        padding-right: 2rem;
        flex: 3;
        text-align: right;
    }
</style>
