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
#app {
  display: flex;
  justify-content: center;
  width: 100vw;
}
.app {
  margin: 0 48px;
  max-width: 1440px;
  @include sm {
    margin: 0;
  }
}
</style>
