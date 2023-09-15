import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    const app = nuxtApp.vueApp;
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
})