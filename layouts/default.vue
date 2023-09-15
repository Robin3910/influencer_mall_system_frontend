<script setup lang="ts">

import Nav from "~/components/Nav.vue";
</script>

<template>
  <div class="dark-them">
    <Nav></Nav>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>