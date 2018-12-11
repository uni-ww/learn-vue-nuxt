const pkg = require('./package')
const webpack = require('webpack');
module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
            { hid: 'description', name: 'description', content: pkg.description },
            { hid: 'keywords', name: 'keywords', content: 'nuxt-demo' },
            { name: 'format-detection', content: 'telephone=no, email=no, date=no, address=no' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon1.ico' },
            { rel: 'stylesheet', type: 'text/css', href: '/css/base.css' },
        ],
        script:[
            {type: 'text/jacascript', src:'/js/rem.js'}
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#333' },

    /*
     ** Global CSS
     */
    css: [
        '~/assets/css/common.less',
        '~/assets/css/swiper.min.css',
        '~/assets/css/animate.css',
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/axios'
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        baseURL:'http://admin.chinakingding.com/'
    },
    proxy: {
    },
    /*
     ** Build configuration
     */
    build: {
        vendor: ['axios','qs'],
        extractCSS: { allChunks: true },
        plugins:[
            new webpack.ProvidePlugin({
                '$':'jquery'
            })
        ]
    }
}
