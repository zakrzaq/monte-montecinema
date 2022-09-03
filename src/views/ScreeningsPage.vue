<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useSeancesStore } from "@/stores/seances";
import { useMovieStore } from "@/stores/movies";
import BreadCrumb from "@/components/BreadCrumb.vue";
import SeancesCard from "@/components/seances/SeancesCard.vue";
import DateSelector from "@/components/seances/DateSelector.vue";
import { prettyDate } from "@/helpers/prettyDate";
const seancesStore = useSeancesStore();
const movieStore = useMovieStore();
const route = useRoute();

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
    <BreadCrumb first-title="Screenings" v-if="route.path === '/screenings'" />
    <h1 class="screenings-page__title heading-1">
      Screenings:<br /><span class="gray">{{
        prettyDate(seancesStore.selectedDate)
      }}</span>
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
    margin-bottom: 32px;
    .gray {
      color: $jumbo;
    }
  }
}
</style>
