<template>
    <!-- 主体信息 -->
    <div>
        <Header></Header>
        <!-- banner -->
        <div class="banner">
            <div class="swiper-container" id="banner-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(slide,index) in slideList" :key="index">
                        <div class="w-fill-img banner-img">
                            <img :src="slide.image" mode="aspectFill" alt>
                        </div>
                        <div
                            class="slide-txt ani"
                            swiper-animate-effect="slideInUp"
                            swiper-animate-duration="1s"
                            swiper-animate-delay="0s"
                        >
                            <div class="slide-tinfo">
                                <div class="slide-cha" v-text="slide.description"></div>
                                <div class="slide-eng" v-text="slide.content"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mine-page w-inline-block" id="mine-page">
                    <div class="page-line"></div>
                    <div
                        class="page-num"
                        :class="{'curr':index==0}"
                        v-for="(slide,index) in slideList"
                        :key="index"
                        @click="switchSwiper(index)"
                    >
                        <span class="num">{{index | counterFilter}}</span>
                        <i class="line"></i>
                    </div>
                </div>
                <div class="banner-btm-icon"></div>
            </div>
        </div>
        <!-- section -->
        <section>
            <div class="contain">
                <!-- 金鼎视频 -->
                <div class="idx-video-box">
                    <div class="idx-t">金鼎视频</div>
                    <div class="idx-l"></div>
                    <div class="idx-vi-v">
                        <!-- <video src=""></video> -->
                        <div class="idx-v-img w-fill-img">
                            <img :src="videoInfo.image" mode="aspectFill" alt>
                        </div>
                        <div class="idx-v-play"></div>
                        <div class="idx-v-view w-inline-block">
                            <i></i>
                            <span v-text="videoInfo.look"></span>
                        </div>
                    </div>
                    <div class="idx-vi-t w-elli" v-text="videoInfo.name"></div>
                    <div class="idx-more idx-vi-more">
                        <a href="#">
                            更多金鼎视频
                            <i></i>
                        </a>
                    </div>
                </div>
                <!-- 新闻动态 -->
                <div class="idx-news-box">
                    <div class="idx-t">新闻动态</div>
                    <div class="idx-l"></div>
                    <div class="idx-news-nav flex-wrap flex-between">
                        <div
                            class="idx-news-n"
                            :class="{'curr':index==0}"
                            v-for="(news,index) in newsNav"
                            :key="news.id"
                            @click="filterNews($event,news.id)"
                        >
                            <span v-text="news.name"></span>
                            <i></i>
                        </div>
                    </div>
                    <div class="idx-news-lists">
                        <div class="idx-news-lis idx-news-lis0">
                            <a href="#">
                                <div class="w-fill-img idx-nl-img">
                                    <img :src="newsInfo.img" mode="aspectFill" alt>
                                </div>
                                <div class="idx-nl-t w-elli-2" v-text="newsInfo.post_title"></div>
                            </a>
                        </div>
                    </div>
                    <div class="idx-more idx-news-more">
                        <a href="#">
                            更多新闻动态
                            <i></i>
                        </a>
                    </div>
                </div>
            </div>
            <!-- footer -->
            <footer>
                <div class="w-footer">
                    <div
                        class="w-foot-d"
                    >版权所有：金鼎地产 Copyright 2017-2018 鲁ICP备11023003号-3 技术支持：成都金鼎时代网络科技有限公司</div>
                </div>
            </footer>
        </section>
    </div>
</template>
<script>
import Header from '~/components/header.vue';
export default {
    components: {Header},
    data() {
        return {
            // seo
            seoKeyword: '',
            seoDesc: '',
            // banner
            slideList: [],
            bannerSwiper: null,

            // news
            newsNav: [],
            newsInfo: {},

            // video
            videoInfo: {}
        }
    },
    head() {
        return {
            title: this.seoKeyword,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.seoDesc
                },
                { hid: 'keywords', name: 'keywords', content: this.seoKeyword }
            ],
            script: [
                { type: 'text/javascript', src: '/js/swiper.min.js' },
                {
                    type: 'text/javascript',
                    src: '/js/swiper.animate1.0.3.min.js'
                }
            ]
        }
    },
    async asyncData({ app }) {
        let seoRes = await app.$axios.$get('api/index/index')
        let bannerRes = await app.$axios.$get('api/Index/web_index')
        let newsRes = await app.$axios.$post('api/index/web_news', { id: '' })
        let videoRes = await app.$axios.$get('api/index/web_video')
        if (
            seoRes.code == 1 &&
            bannerRes.code == 1 &&
            newsRes.code == 1 &&
            videoRes.code == 1
        ) {
            return {
                seoKeyword: seoRes.data.seo_keywords,
                seoDesc: seoRes.data.seo_description,
                slideList: bannerRes.data.slide_list,
                newsNav: newsRes.data.class,
                newsInfo: newsRes.data.info,
                videoInfo: videoRes.data
            }
        }
    },
    mounted() {
        this.newSwiperFn()
    },
    methods: {
        async filterNews(e, id) {
            let tag = e.currentTarget
            if (!$(tag).hasClass('curr')) {
                $(tag)
                    .addClass('curr')
                    .siblings()
                    .removeClass('curr')
                let newsRes = await this.$axios.$post('api/index/web_news', {
                    id: id
                })
                if (newsRes.code == 1) {
                    this.newsInfo = newsRes.data.info
                }
            }
        },
        // 创建实例swiper
        newSwiperFn() {
            this.bannerSwiper = new Swiper('#banner-swiper', {
                // loop:true,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false
                },
                on: {
                    init: function() {
                        swiperAnimateCache(this) //隐藏动画元素
                        swiperAnimate(this) //初始化完成开始动画
                    },
                    slideChangeTransitionStart: function() {
                        // console.log(this.activeIndex)
                        var i = this.activeIndex
                        $('#mine-page .page-num')
                            .eq(i)
                            .addClass('curr')
                            .siblings('.page-num')
                            .removeClass('curr')
                    },
                    slideChangeTransitionEnd: function() {
                        swiperAnimate(this)
                    }
                }
            })
        },
        // 点击切换swiper
        switchSwiper(i) {
            this.bannerSwiper.slideTo(i, 600, true)
        }
    },
    filters: {
        counterFilter(c) {
            return ++c < 10 ? '0' + c : c
        }
    }
}
</script>
<style lang="less">
@import url('~assets/css/style.less');
@url: '~/image/';

.banner {
    height: 100%;

    .swiper-container {
        height: 100%;
    }

    .banner-img {
        .hei();
        min-height: 5.68rem;
    }

    .banner-btm-icon {
        position: absolute;
        left: 50%;
        bottom: 0.3rem;
        z-index: 10;
        .wid(0.56rem);
        .hei(0.56rem);
        margin-left: -0.28rem;
        background: url('@{url}icon-jiantou-shouye-d.png') no-repeat center;
        background-size: 0.56rem;
        -webkit-animation: transBtm 0.6s ease-in infinite;
        -moz-animation: transBtm 0.6s ease-in infinite;
        -ms-animation: transBtm 0.6s ease-in infinite;
        -o-animation: transBtm 0.6s ease-in infinite;
        animation: transBtm 0.6s ease-in infinite;
    }
}

@keyframes transBtm {
    0% {
        bottom: 0.3rem;
    }

    100% {
        bottom: 0.1rem;
    }
}

.slide-txt {
    position: absolute;
    left: 0;
    top: 28vh;
    z-index: 10;
    width: 100%;
    height: 5.8rem;
    .fsize(0.68rem);
    .col(#fff);
    text-align: center;
    opacity: 0.9;
    -webkit-text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    -moz-text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    -ms-text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    -o-text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    display: table;

    .slide-tinfo {
        display: table-cell;
        vertical-align: middle;
    }

    .slide-cha {
        .lhei(0.94rem);
    }

    .slide-eng {
        margin-top: 0.1rem;
        .fsize(0.56rem);
        .lhei(0.78rem);
    }

    &:after {
        content: '';
        width: 0;
        height: 5.8rem;
        display: table-cell;
        vertical-align: middle;
    }
}

.mine-page {
    position: absolute;
    left: 50%;
    .transX();
    bottom: 0.9rem;
    z-index: 10;
    width: auto;
    overflow: hidden;

    .page-line {
        position: absolute;
        left: 0;
        bottom: 0.3rem;
        width: 100%;
        height: 1px;
        background-color: #fff;
        opacity: 0.2;
    }

    .page-num {
        .col(#fff);
        .pad();
        .fsize(0.3rem);
        opacity: 0.4;
        margin: 0 0.11rem;
        font-weight: bold;
        .lhei();
        text-align: center;

        &.curr {
            opacity: 1;

            & > .line {
                display: block;
            }
        }

        & > .num {
            display: block;
            .padb(0.42rem);
        }

        & > .line {
            display: block;
            width: 0.36rem;
            height: 2px;
            .radius(1px);
            opacity: 0.8;
            background-color: #fff;
            margin: 0 auto;
            display: none;
        }
    }
}

/* nav */
.idx-nav-box {
    .pad(0.3rem);
    text-align: center;
    .padt(0.4rem);
    .bgcol(@cl-f);

    .idx-nav {
        a {
            text-decoration: none;
        }

        .wid(1.2rem);

        .idx-n-img {
            .wid(1.2rem);
            .hei(1.2rem);
            .marb(0.2rem);

            & > img {
                display: block;
                .wid();
            }
        }

        .idx-n-txt {
            .col(@cl-3);
            .fsize(0.28rem);
            .lhei(0.4rem);
        }
    }
}

/* 公共头部 */
.idx-t {
    .padt(0.8rem);
    .lhei();
    .fsize(0.36rem);
    .col(@cl-3);
    font-weight: bold;
    text-align: center;
    .marb(0.24rem);
}

.idx-l {
    margin: 0 auto;
    .wid(0.24rem);
    .hei(0.04rem);
    .bgcol(@cl-gold);
}

.idx-more {
    .wid(44%);
    .hei(0.6rem);
    .bor-1px(@cl-77);
    margin: 0 auto;

    & > a {
        position: relative;
        display: block;
        .hei(0.6rem);
        text-decoration: none;
        z-index: 12;
        text-align: center;
        .col(@cl-78);
        .fsize(0.28rem);
        .lhei(0.7rem);
        overflow: hidden;

        & > i {
            display: inline-block;
            .wid(0.1rem);
            .hei(0.2rem);
            background: url('@{url}icon-more.png') no-repeat center;
            background-size: 0.1rem 0.2rem;
            .marl(0.1rem);
        }
    }
}

/* 金鼎视频 */
.idx-video-box {
    .pad(0.3rem);
    .padb(0.8rem);

    .idx-vi-v {
        position: relative;
        .mart(0.6rem);

        .idx-v {
            &-img {
                .hei(3.9rem);
            }

            &-play {
                position: absolute;
                left: 50%;
                top: 50%;
                .wid(1.2rem);
                .hei(1.2rem);
                .trans();
                background: url('@{url}icon-bofang2.png') no-repeat center;
                background-size: contain;
            }

            &-view {
                position: absolute;
                right: 0.2rem;
                bottom: 0.24rem;
                .hei(0.4rem);
                .lhei(0.4rem);
                opacity: 0.6;

                & > i {
                    .wid(0.4rem);
                    .hei(0.4rem);
                    background: url('@{url}icon-liulan48.png') no-repeat center;
                    background-size: 0.44rem;
                    vertical-align: middle;
                }

                & > span {
                    .fsize(0.28rem);
                    .col(@cl-f);
                    vertical-align: middle;
                    .marl(0.12rem);
                }
            }
        }
    }

    .idx-vi-t {
        .pad(0.2rem);
        .fsize(0.3rem);
        .lhei(0.48rem);
        .padt(0.2rem);
        .padb(0.5rem);
        .col(@cl-3);
        font-weight: bold;
    }

    .idx-vi-more {
    }
}

/* 新闻动态 */
.idx-news-box {
    background: #efefef url('@{url}bg-duobian.png') no-repeat center top;
    background-size: 100% 5.28rem;
    .padb(0.8rem);

    .idx-news-nav {
        .hei(1rem);
        .mart(0.3rem);
        .lhei(1rem);
        .pad(0.2rem);
        .bor-1px-b(#d1d1d1);

        .idx-news-n {
            position: relative;
            .fsize(0.28rem);
            .col(@cl-6);

            & > i {
                position: absolute;
                left: 50%;
                bottom: 0;
                .wid(0.56rem);
                .hei(0.04rem);
                .bgcol(@cl-77);
                display: none;
                .marl(-0.28rem);
            }

            &.curr {
                .col(@cl-78);
                font-weight: bold;

                & > i {
                    display: block;
                }
            }
        }
    }

    .idx-news-lists {
        .mart(0.3rem);
        .marb(0.5rem);
        .bgcol(@cl-f);
        .marl(0.3rem);
        .marr(0.3rem);
        .wid(calc(~'100% - .6rem'));

        .idx-news-lis {
            .padb(0.3rem);

            a {
                text-decoration: none;
            }

            .idx-nl {
                &-t {
                    .fsize(0.32rem);
                    .lhei(0.48rem);
                    .col(@cl-3);
                    font-weight: bold;
                    .hei(0.96rem);
                    .pad(0.3rem);
                    .mart(0.2rem);
                }

                &-img {
                    .hei(4.6rem);
                }

                &-d {
                    .fsize(0.28rem);
                    .lhei(0.44rem);
                    .hei(0.88rem);
                    .col(@cl-9);
                    .pad(0.3rem);
                    .mart(0.2rem);
                }
            }
        }
    }
}

/* 楼盘项目 */
.idx-lou-box {
    .pad(0.3rem);
    .padb(0.8rem);

    .idx-lou-lists {
        .mart(0.5rem);
        .marb(0.5rem);

        .idx-lou-lis {
            .wid();
            .hei(2.42rem);
            .marb(0.3rem);

            &:last-child {
                .marb(0);
            }

            .idx-lou-lis-link {
                position: relative;
                z-index: 11;
                display: block;
            }

            .idx-lou {
                &-img {
                    .wid(2.42rem);
                    .hei(2.42rem);
                }

                &-info {
                    .wid(calc(~'100% - 2.44rem'));
                    .hei(2.42rem);
                    .padl(0.3rem);

                    .idx-lou {
                        &-it {
                            .padr(0.1rem);
                            .fsize(0.36rem);
                            .lhei(0.4rem);
                            .padt(0.26rem);
                            .col(@cl-3);
                            font-weight: bold;
                            .marb(0.1rem);
                        }

                        &-id {
                            .padr(0.1rem);
                            .fsize(0.28rem);
                            .lhei(0.4rem);
                            .col(@cl-6);
                            .marb(0.22rem);
                        }

                        &-itb {
                            .idx-lou-tr1 {
                                .fsize(0.32rem);
                                font-weight: bold;
                                .col(@cl-3);
                                .padb(0.1rem);
                                .lhei();
                            }

                            .idx-lou-tr2 {
                                .fsize(0.24rem);
                                .lhei();
                                .col(@cl-9);
                            }

                            .idx-lou-td1 {
                                .wid(1.44rem);
                            }

                            .idx-lou-td2 {
                                word-break: break-all;
                                .wid(1.7rem);
                            }

                            .idx-lou-td3 {
                                .wid(1rem);
                            }
                        }
                    }
                }
            }
        }
    }
}

/* 二维码 */
.idx-qr-box {
    position: relative;
    z-index: 10;
    .pad(0.3rem);

    .idx-qr {
        .wid();
        .hei(8.6rem);
        background: url('@{url}bg-lianxi.jpg') no-repeat center;
        background-size: cover;
        text-align: center;

        .idx-qr {
            &-t {
                .padt(1.08rem);
                .lhei();
                .fsize(0.3rem);
                .col(@cl-f);
            }

            &-l {
                margin: 0 auto;
                .mart(0.44rem);
                .wid(0.02rem);
                .hei(0.44rem);
                .bgcol(@cl-f);
                .marb(0.44rem);
            }

            &-d {
                .fsize(0.36rem);
                .col(@cl-f);
                .lhei(0.48rem);
                .marb(0.8rem);
            }

            &-i {
                .fsize(0.3rem);
                .col(@cl-f);
                .marb(0.5rem);
            }

            &-img {
                .wid(2rem);
                .hei(2rem);
                margin: 0 auto;
            }
        }
    }
}

.idx-foot-bg {
    position: relative;

    .idx-foot {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 9;
        .wid();
        .hei(2.64rem);
        .bgcol(#3a3a3a);
    }
}
</style>
