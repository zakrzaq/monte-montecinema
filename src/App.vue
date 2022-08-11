<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <div class="app">
    <TheHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app {
  margin: 0 48px;
}
</style>
