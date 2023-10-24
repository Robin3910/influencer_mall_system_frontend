// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {}
    },
    nitro: {
        devProxy: {
            "/wh": {
                target: "http://localhost:9527/wh", // 这里是接口地址
                changeOrigin: true,
                prependPath: true,
            }
        },
        routeRules: {
            '/wh/**': {
                proxy: 'http://127.0.0.1:9527/**'
            }
        }
    },
    postcss: {

        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: [
        '~/assets/css/main.less'
    ],
    devtools: {enabled: false},
    modules: ['@element-plus/nuxt', '@nuxtjs/svg-sprite',],
    plugins: [
        {
            src: "~/plugins/vue-infinite-scroll.ts",
            mode: "client"
        }
    ]

})
