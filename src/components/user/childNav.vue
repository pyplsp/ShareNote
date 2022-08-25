<template>
    <div id="detailsNav">
        <div class="back">
            <slot name="icon"></slot>
        </div>
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="other">
            <slot name="other"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "editorNav",

}
</script>

<style scoped>
    #detailsNav{
        position: fixed;
        top: 0;
        width: 100%;
        height: 3rem;
        display: flex;
        flex-direction: row;
        background-color: var(--color-theme);
        color: white;
    }
    .back{
        line-height: 3rem;
        flex: 1;
        padding-left: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }
    .title{
         color: white;
         line-height: 3rem;
         flex: 1;
         text-align: center;
         border:0;
     }
    .other{
        line-height: 3rem;
        flex: 1;
        padding-right: 1rem;
        text-align: right;
    }
</style>
