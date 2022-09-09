<script setup lang="ts">
import MovieCard from "@/components/movies/MovieCard.vue";
import BreadCrumbs from "@/components/BreadCrumb.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NoResults from "@/components/NoResults.vue";
import { useMovieStore } from "@/stores/movies";
import { useUiStore } from "@/stores/ui";
import { computed, ref } from "vue";
const moviesStore = useMovieStore();
const uiStore = useUiStore();

const query = ref("");
const category = ref("");

const categorisedMovies = computed(() => {
  if (!moviesStore.movieList) return [];
  return category.value === "" || category.value === "All categories"
    ? moviesStore.movieList
    : moviesStore.movieList.filter(
        (movie) => movie.genre.name === category.value
      );
});

const filteredTitleMovives = computed(() => {
  if (!moviesStore.movieList) return [];

  return query.value
    ? categorisedMovies.value.filter((movie) =>
        movie.title.toLowerCase().includes(query.value)
      )
    : categorisedMovies.value;
});

const selectOptions = computed(() => {
  const all = ["All movies", ...moviesStore.genreList];
  return all.map((item) => {
    return { id: item, title: item };
  });
});
</script>

<template>
  <BreadCrumbs first-title="Movies" />
  <div class="page-title">
    <h1 class="heading-1">All the movies</h1>
  </div>
  <div class="controls">
    <BaseInput v-model="query" name="search">Search</BaseInput>
    <BaseSelect v-model="category" :options="selectOptions"
      >Category</BaseSelect
    >
  </div>
  <template v-if="filteredTitleMovives.length">
    <div v-if="!uiStore.moviesLoading" class="movies-list">
      <MovieCard
        v-for="movie in filteredTitleMovives"
        :key="movie.id"
        :movie="movie"
        :to="{ name: 'SingleMoviePage', params: { id: movie.id } }"
      />
    </div>
    <div v-else><LoadingSpinner /></div>
  </template>
  <NoResults v-else>
    Sorry we have no movies to show you at the moment
  </NoResults>
</template>

<style scoped lang="scss">
.page-title {
  .heading-1 {
    @include sm {
      font-size: 48px;
      width: 100%;
      text-align: center;
    }
  }
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  grid-template-areas: "input input select";
  gap: 40px;

  @include md {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "input select";
  }

  @include sm {
    grid-template-columns: 1fr;
    grid-template-areas:
      "input"
      "select";
  }

  .base-input {
    grid-area: input;
  }
}

.movies-list {
  margin-top: 24px;
  margin-bottom: 64px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  gap: 40px;
  justify-content: space-between;
  align-items: center;
}
</style>
