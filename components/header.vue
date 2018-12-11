<template>
    <div>
        <div class="w-header w-header1">
            <div class="w-logo">
                <a href="#">
                    <img src="/image/logo1.png" alt="logo">
                </a>
            </div>
            <div class="h-more-icon2 wh-open-more" @click="openSidebar"></div>
            <div class="h-search-icon2 js_search" @click="openSearchBox"></div>
        </div>
        <!-- 搜索 -->
        <div class="w-search-pop js_search_pop">
            <div class="js_search_bg w-search-bg" @click="closeSearchBox"></div>
            <div class="w-search-box flex-wrap js_search_box">
                <div class="search-inp-outer flex-con">
                    <div class="search-inp-inner">
                        <!-- <form action="#"> -->
                            <input type="search" placeholder="请输入关键词" v-model="searchKeyword" @keyup.enter="searchSubmitFn">
                        <!-- </form> -->
                        <i @click="searchSubmitFn"></i>
                    </div>
                </div>
                <div class="search-cancel js_search_cancel" @click="closeSearchBox">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{

    },
    data(){
        return{
            searchKeyword:''
        }
    },
    methods:{
        // 打开侧边栏
        openSidebar(){

        },
        openSearchBox(){
            $('.js_search_pop').show();
            $('.js_search_box').addClass('curr fadeInRight animated');
        },
        closeSearchBox(){
            $('.js_search_pop').hide();
            $('.js_search_box').removeClass('curr fadeInRight animated');
        },
        // 搜索
        searchSubmitFn(){
            console.log(this.searchKeyword)
            return false;
        }
    }
}
</script>
<style>

</style>


