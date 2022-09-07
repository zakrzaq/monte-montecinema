<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useSeancesStore } from "@/stores/seances";
import { useMovieStore } from "@/stores/movies";
import { useUiStore } from "@/stores/ui";
import BreadCrumb from "@/components/BreadCrumb.vue";
import SeancesCard from "@/components/seances/SeancesCard.vue";
import DateSelector from "@/components/seances/DateSelector.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NoResults from "@/components/NoResults.vue";
import { prettyDate } from "@/helpers/prettyDate";
const seancesStore = useSeancesStore();
const movieStore = useMovieStore();
const uiStore = useUiStore();
const route = useRoute();

const props = defineProps<{
  selectedMovie?: number;
}>();

const currentMovies = computed(() => {
  return seancesStore.uniqueMovies.map((movie) => ({
    id: movie,
    genre: movieStore.movieById(movie)?.genre.name,
    title: movieStore.movieById(movie)?.title,
  }));
});
const selectedTitle = ref(
  props.selectedMovie
    ? movieStore.movieById(props.selectedMovie)?.title
    : "All movies"
);
const moviesByTitle = computed(() => {
  return selectedTitle.value === "All movies"
    ? currentMovies.value
    : currentMovies.value.filter(
        (movie) => movie.title === selectedTitle.value
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
    <DateSelector v-model="selectedTitle" />
    <LoadingSpinner v-if="uiStore.seancesLoading" />
    <div v-else>
      <template v-if="moviesByTitle.length > 0">
        <SeancesCard
          v-for="movie in moviesByTitle"
          :key="movie.id"
          :movie="movieStore.movieById(movie.id)"
          :seances="seancesStore.seancesByMovie(movie.id)"
        />
      </template>
      <NoResults v-else>
        No screenings for {{ selectedTitle }} on
        {{ prettyDate(seancesStore.selectedDate) }}.
      </NoResults>
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
