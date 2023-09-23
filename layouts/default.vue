<script setup lang="ts">

import Nav from "~/components/Nav.vue";
</script>

<template>
  <div class="dark-theme"  style="padding-top: 60px">
    <div style="position:fixed;width: 100%;top: 0;z-index: 1000">
      <Nav></Nav>
    </div>

    <div class="mt-5 md:container page-wrap mx-auto overflow-hidden pl-5 pr-5 md:pl-0 md:pr-0">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>