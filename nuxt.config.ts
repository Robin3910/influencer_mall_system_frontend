// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

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
    modules: ['@element-plus/nuxt'],

})
