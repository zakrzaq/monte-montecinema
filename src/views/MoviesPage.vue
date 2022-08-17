<script setup lang="ts">
import { onMounted, ref } from "vue";
import MovieCard from "@/components/movies/MovieCard.vue";
import { useMovieStore } from "@/stores/movies";
const moviesStore = useMovieStore();
</script>

<template>
  <template v-if="!moviesStore.loading">
    <div class="movies-list">
      <MovieCard
        v-for="movie in moviesStore.movieList"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </template>
  <template v-else> Loading... </template>
</template>

<style scoped lang="scss">
.movies-list {
  margin-top: 24px;
  margin-bottom: 64px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  justify-content: space-between;
  align-items: center;
  @include sm {
    flex-direction: column;
  }

  .movie:last-of-type {
    @include lg-down {
      display: none;
    }
    @include sm {
      display: flex;
    }
  }
}
</style>
