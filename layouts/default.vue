<script setup lang="ts">

import Nav from "~/components/Nav.vue";
</script>

<template>
  <div class="dark-theme"  style="padding-top: 60px">
    <div style="position:fixed;width: 100%;top: 0">
      <Nav></Nav>
    </div>

    <div class="mt-5 md:container page-wrap mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>