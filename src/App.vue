<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/stores/movies";
import { useSeancesStore } from "@/stores/seances";
import { onMounted, watch } from "vue";
const movieStore = useMovieStore();
const seancesStore = useSeancesStore();
const { selectedDate } = storeToRefs(seancesStore);

onMounted(async () => {
  movieStore.fetchMovieList();
  seancesStore.getCurrentSeances();
});

watch(selectedDate, () => {
  seancesStore.getCurrentSeances();
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
