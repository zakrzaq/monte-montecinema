<script setup lang="ts">
import { useSeancesStore } from "@/stores/seances";
import { useMovieStore } from "@/stores/movies";
import SeancesCard from "@/components/seances/SeancesCard.vue";
const seancesStore = useSeancesStore();
const movieStore = useMovieStore();
</script>

<template>
  <div>
    <h1>Screenings:<br />Date</h1>
    <div>
      <SeancesCard v-for="movie in seancesStore.currentMovies" :key="movie" :movie="movieStore.movieById(movie)"
        :seances="seancesStore.seancesByMovie(movie)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
