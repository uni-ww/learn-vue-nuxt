const pkg = require('./package')

module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
        '~/assets/css/common.less'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios',
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        prefix: '/api/',
        proxy: true
    },
    proxy: {
        '/api/': { target: 'http://admin.chinakingding.com/', pathRewrite: {'^/api/': ''} }
    },
    /*
     ** Build configuration
     */
    build: {
        vendor: ['axios']
    }
}
