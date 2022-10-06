<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/stores/movies";
import { useSeancesStore } from "@/stores/seances";
// import { useUserStore } from "@/stores/user";
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
const t = useI18n();
const movieStore = useMovieStore();
const seancesStore = useSeancesStore();
// const userStore = useUserStore();
const { selectedDate } = storeToRefs(seancesStore);

const loadPreviousLocale = () => {
  const savedLocale = localStorage.getItem("LOCALE");
  if (savedLocale) t.locale.value = savedLocale;
};

onMounted(async () => {
  movieStore.fetchMovieList();
  seancesStore.getCurrentSeances();
  loadPreviousLocale();
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
  <notifications position="top right" :duration="3000" :closeOnClick="true" />
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
