<template>
    <section class="container">
        <h2>hhh</h2>
        <div class="box">this is box</div>
        <div class="test">
            <div class="t-box bor-1px-b">this is test</div>
        </div>
    </section>
</template>
<script>
export default {
    components: {},
    asyncData(context) {
        // console.log(context.$axios.get)
        // console.log(app.$axios)

        context.$axios.post('api/Index/web_index')
        .then(res => {
            cosnole.log(res)
        })
    }
}

</script>
<style lang="less">
@import url('../assets/css/style.less');

.container {
    min-height: 100vh;

    .box {
        .fsize(.4rem);
        color: @cl-3;
        .bor-1px(red);
    }
}

</style>
