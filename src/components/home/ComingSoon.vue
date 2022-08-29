<script setup lang="ts">
import MovieCard from "@/components/movies/MovieCard.vue";
import { comingSoon } from "@/data/coming-soon";
</script>

<template>
  <div class="comming">
    <div class="comming__header">
      <h2 class="heading-2">COMMING SOON</h2>
      <h2 class="heading-2--red">
        <RouterLink :to="{ name: 'MoviesPage' }"> SEE ALL </RouterLink>
      </h2>
    </div>
    <div class="comming__movies">
      <MovieCard v-for="movie in comingSoon" :key="movie.id" :movie="movie"
        :to="{ name: 'SingleMoviePage', params: { id: movie.id } }" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.comming {
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .heading-2 {
      color: $tuna;
    }

    .heading-2--red {
      color: $cherry-red;
    }
  }

  &__movies {
    margin-top: 24px;
    margin-bottom: 64px;
    width: 100%;
    display: flex;
    gap: 40px;
    justify-content: space-between;
    align-items: center;

    @include sm {
      flex-direction: column;
    }

    .movie:last-of-type {
      @include lg {
        display: none;
      }

      @include md {
        display: none;
      }

      @include sm {
        display: flex;
      }
    }
  }
}
</style>
