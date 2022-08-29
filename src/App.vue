<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import { useMovieStore } from "@/stores/movies";
import { onMounted } from "vue";
const movieStore = useMovieStore();
onMounted(async () => {
  movieStore.fetchMovieList();
});
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  max-width: 1500px;
  margin: 0 48px;
}
</style>
