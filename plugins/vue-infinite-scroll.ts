import ElTableInfiniteScroll from "el-table-infinite-scroll";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(ElTableInfiniteScroll)
})
