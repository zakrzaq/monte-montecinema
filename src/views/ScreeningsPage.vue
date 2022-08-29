<script setup lang="ts">
import { ref, computed } from "vue";
import { useSeancesStore } from "@/stores/seances";
import { useMovieStore } from "@/stores/movies";
import BreadCrumb from "@/components/BreadCrumb.vue";
import SeancesCard from "@/components/seances/SeancesCard.vue";
import DateSelector from "@/components/seances/DateSelector.vue";
const seancesStore = useSeancesStore();
const movieStore = useMovieStore();

const currentMovies = computed(() => {
  return seancesStore.uniqueMovies.map((movie) => ({
    id: movie,
    genre: movieStore.movieById(movie)?.genre.name,
  }));
});
const selectedCategory = ref("All categories");
const moviesByCategory = computed(() => {
  return selectedCategory.value === "All categories"
    ? currentMovies.value
    : currentMovies.value.filter(
        (movie) => movie.genre === selectedCategory.value
      );
});
</script>

<template>
  <div class="screenings-page">
    <BreadCrumb first-title="Screenings" />
    <h1 class="Screenings-page__title heading-1">
      Screenings:<br /><span class="gray">Date</span>
    </h1>
    <DateSelector v-model="selectedCategory" />
    <div>
      <SeancesCard
        v-for="movie in moviesByCategory"
        :key="movie.id"
        :movie="movieStore.movieById(movie.id)"
        :seances="seancesStore.seancesByMovie(movie.id)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.screenings-page {
  &__title {
    .gray {
      color: $jumbo;
    }
  }
}
</style>
