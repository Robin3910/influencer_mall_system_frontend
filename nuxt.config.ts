// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig:{
        public:{
            apiHost:"http://127.0.0.1:9527"
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
    devtools: {enabled: true},
    modules: ['@element-plus/nuxt']

})
