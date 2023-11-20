<template>
  <div class="nav-wrap cursor-pointer" >
    <nav class="md:container  mx-auto  flex  justify-between">
      <!--左侧菜单-->
      <div class=" flex items-center ">
        <!--logo-->
        <div class="logo hidden md:flex">
          <img src="/img/logo.png"/>
<!--          <span>站外推广</span>-->
        </div>
        <!--menu-->
        <div class=" hidden md:flex">
          <Menu direction="horizontal"></Menu>
        </div>
        <div class="md:hidden flex items-center">
          <el-icon class="text-2xl  text-gray-600	" @click="handlerShowMenu">
            <Fold v-if="isShowMenu"/>
            <Expand v-if="!isShowMenu"/>
          </el-icon>
        </div>
      </div>
      <!--右边-->
      <div class=" flex items-center">
<!--        <el-button type="primary" @click="handlePromotion">我要推广</el-button>-->
<!--        <el-button color="#FF5500" type="primary">我要下单</el-button>-->
<!--        <el-button>联系客服</el-button>-->
<!--        <el-icon class="text-2xl ml-2.5 text-gray-600">-->
<!--          <User/>-->
<!--        </el-icon>-->
      </div>
    </nav>

  </div>
  <!-- 扩展菜单-->
  <el-drawer append-to-body size="60%" direction="ltr" v-model="isShowMenu" title="I am the title" :with-header="false">
    <Menu direction="vertical" @change="isShowMenu=!isShowMenu"></Menu>
  </el-drawer>
</template>
<script setup lang="ts">
import Menu from "~/components/Menu.vue";

let isShowMenu = ref(false)

let menuData = ref([])
const handlerShowMenu = () => {
  isShowMenu.value = !isShowMenu.value;
}
const handlePromotion = ()=>{
  window.open("https://snow123.com/contact_us", "_blank");
}
onMounted(() => {
  window.addEventListener("resize", () => {
    let width = document.documentElement.clientWidth
    if (width >= 768) {
      isShowMenu.value = false
    }
  })
})
</script>
<style lang="less">
@import "@/assets/css/main.less";

.nav-wrap {
  height: 60px;
  background-color: white;

  nav {

    height: 100%;
  @apply p-2;

    .logo {
      height: 100%;
    @apply items-center;

      img {
        height: 100%;
      }

      span {
      @apply ml-2 font-sans text-lg font-semibold;
      }
    }
  }
}
</style>