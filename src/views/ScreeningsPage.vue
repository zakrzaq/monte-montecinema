<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useTitle } from "@vueuse/core";
import { useSeancesStore } from "@/stores/seances";
import { useMovieStore } from "@/stores/movies";
import { useUiStore } from "@/stores/ui";
import BreadCrumb from "@/components/BreadCrumb.vue";
import SeancesCard from "@/components/seances/SeancesCard.vue";
import DateSelector from "@/components/seances/DateSelector.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NoResults from "@/components/NoResults.vue";
import { prettyDate } from "@/helpers/prettyDate";
import type { MovieWithSeances } from "@/types/seance";
const seancesStore = useSeancesStore();
const movieStore = useMovieStore();
const uiStore = useUiStore();
const userStore = useUserStore();
const route = useRoute();

const props = defineProps<{
  selectedMovie?: number;
}>();

const currentMoviesWithSeances = computed(() => {
  return movieStore.movieList.map((movie) => {
    const screeningsForMovie = seancesStore.seancesByMovie(movie.id);
    return { ...movie, screenings: screeningsForMovie } as MovieWithSeances;
  });
});
const selectedTitle = ref(
  props.selectedMovie
    ? movieStore.movieById(props.selectedMovie)?.title
    : "All movies"
);
const currentMoviesbyTitle = computed(() => {
  return selectedTitle.value === "All movies"
    ? currentMoviesWithSeances.value
    : currentMoviesWithSeances.value.filter(
        (movie) => movie.title === selectedTitle.value
      );
});
const showEmployeeBreadcrumbs = computed(() => {
  return route.path === "/screenings" && userStore.isEmployee ? true : false;
});

onMounted(() => {
  if (route.matched.some((el) => el.path === "/screenings"))
    useTitle("Montecinema | Screenings");
});
</script>

<template>
  <div class="screenings-page">
    <BreadCrumb
      v-if="showEmployeeBreadcrumbs"
      :first-title="userStore.selectedDesk"
      second-title="Create a reservation"
    />
    <BreadCrumb v-else first-title="Screenings" />
    <h1 class="screenings-page__title heading-1">
      Screenings:<br /><span class="gray">{{
        prettyDate(seancesStore.selectedDate)
      }}</span>
    </h1>
    <DateSelector v-model="selectedTitle" />
    <LoadingSpinner v-if="uiStore.seancesLoading" />
    <div v-else>
      <template v-if="currentMoviesbyTitle">
        <SeancesCard
          v-for="movie in currentMoviesbyTitle"
          :key="movie.id"
          :movie="movie"
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
