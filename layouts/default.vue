<template>
    <div class="w-center">

        <!-- 主体信息 -->
        <div class="w-section idx-section">
        	<nuxt />
        </div>
        <div class="w-aside">
            <div class="w-header w-header3">
                <div class="w-logo">
                    <a href="#"><img src="/image/logo1.png" alt="logo"></a>
                </div>
                <div class="h-close-icon wh-close-more"></div>
            </div>
            <div class="w-aside-lists">
                <ul>
                    <li>
                        <a href="#">首页</a>
                    </li>
                    <li class="aside-more">
                        <div class="aside-nav-t">走进金鼎<i></i></div>
                        <div class="aside-nav-more">
                            <a href="#">公司概括</a>
                            <a href="#">董事长致辞</a>
                            <a href="#">管理团队</a>
                            <a href="#">金鼎大事记</a>
                            <a href="#">金鼎荣誉</a>
                            <a href="#">金鼎文化</a>
                        </div>
                    </li>
                    <li class="aside-more">
                        <div class="aside-nav-t">新闻动态<i></i></div>
                        <div class="aside-nav-more">
                            <a href="#">集团新闻</a>
                            <a href="#">媒体关注</a>
                            <a href="#">高层访问</a>
                            <a href="#">区域动态</a>
                            <a href="#">行业动态</a>
                        </div>
                    </li>
                    <li>
                        <a href="#">产品与服务</a>
                    </li>
                    <li class="aside-more">
                        <div class="aside-nav-t">产品与服务<i></i></div>
                        <div class="aside-nav-more">
                            <a href="#">国内房产</a>
                            <a href="#">海外房产</a>
                            <a href="#">房产销售</a>
                            <a href="#">二手房产</a>
                            <a href="#">物业服务</a>
                            <a href="#">教育培训</a>
                            <a href="#">金融投资</a>
                            <a href="#">互联网+</a>
                            <a href="#">移民留学</a>
                        </div>
                    </li>
                    <li class="aside-more">
                        <div class="aside-nav-t">人力资源<i></i></div>
                        <div class="aside-nav-more">
                            <a href="#">人才理念</a>
                            <a href="#">社会招聘</a>
                            <a href="#">校园招聘</a>
                            <a href="#">培训发展</a>
                        </div>
                    </li>
                    <li class="aside-more">
                        <div class="aside-nav-t">社会责任<i></i></div>
                        <div class="aside-nav-more">
                            <a href="#">公益理念</a>
                            <a href="#">映刚基金</a>
                            <a href="#">志愿者在行动</a>
                        </div>
                    </li>
                    <li>
                        <a href="#">联络金鼎</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-go-top"></div>
    </div>
</template>
<script>
</script>
<style lang="less">
@import url('../assets/css/style.less');
@url: '~/image/';

body {
    color: @cl-3;
}

body,
html {

    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

body,
html,
.w-center {
    height: 100vh;
}

.w-center {
    position: relative;
    /* max-width: 640px;
	margin:0 auto; */
    // overflow: hidden;
}

.w-section {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .transition(left, .4s);

    &.remove-curr {
        left: -100%;
    }
}

.w-aside {
    position: absolute;
    left: 100%;
    top: 0;
    z-index: 1101;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // overflow-x:hidden;
    // overflow-y:scroll;
    // -webkit-overflow-scrolling:touch;
    .bgcol(#fff);
    .transition(left, .4s);

    &.curr {
        left: 0;
    }

    .w-aside-lists {
        height: 100%;
        .padt(1.2rem);
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        li {
            .lhei(1.2rem);
            .fsize(.36rem);
            font-weight: bold;

            &>a {
                display: block;
                .pad(.4rem);
                .col(@cl-3);
                text-decoration: none;

                &.curr {
                    .col(@cl-78);
                }
            }

            &.aside-more {
                position: relative;

                .aside-nav-t {
                    position: relative;
                    .pad(.4rem);

                    &>i {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 1.2rem;
                        height: 1.2rem;
                        background: url('~/image/icon-jiantou-fenlei-r.png') no-repeat center;
                        background-size: .32rem .32rem;
                    }

                    &.curr {
                        .col(@cl-f);
                        .bgcol(@cl-77);

                        &>i {
                            background: url('~/image/icon-jiantou-fenlei-d.png') no-repeat center;
                            background-size: .32rem .32rem;
                        }
                    }

                    &.curr1 {
                        &>i {
                            background: url('~/image/icon-jiantou-felei-rw.png') no-repeat center;
                            background-size: .32rem .32rem;
                        }
                    }
                }

                .aside-nav-more {
                    .pad(0, .18rem);
                    .bgcol(@cl-f7);
                    display: none;

                    &>a {
                        display: block;
                        height: .9rem;
                        .pad(.4rem);
                        .lhei(.9rem);
                        .col(@cl-6);
                        text-decoration: none;
                        font-weight: normal;

                        &.curr {
                            .col(@cl-78);
                        }
                    }
                }
            }
        }
    }
}

.w-go-top {
    position: fixed;
    right: .2rem;
    bottom: .3rem;
    z-index: 1000;
    .wid(.88rem);
    .hei(.88rem);
    background: url('@{url}icon-zhiding88.png') no-repeat center;
    background-size: cover;
    // display: none;	
}

</style>
