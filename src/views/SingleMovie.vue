<script setup lang="ts">
import { computed } from "vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useMovieStore } from "@/stores/movies";
import { useRoute } from "vue-router";
import lengthToTime from "@/helpers/lengthToTime";
const movieStore = useMovieStore();
const route = useRoute();

const selectedId = computed(() => route.params.id.toString());
const selectedMovie = computed(
  () =>
    movieStore.movieList.find(
      (movie) => movie.id.toString() === selectedId.value
    ) || {
      title: "Movie.title",
      length: 115,
      description: "description...",
      poster_url:
        "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg",
      genre: { name: "genre" },
    }
);
</script>

<template>
  <div class="wrapper">
    <BreadCrumb first-tier="/movies" :second-title="selectedMovie.title" />
    <div class="single-movie">
      <div class="single-movie__description">
        <h1>{{ selectedMovie.title }}</h1>
        <div>
          <span class="single-movie__genre">{{
            selectedMovie.genre.name
          }}</span>
          <span class="single-movie__length">{{
            lengthToTime(selectedMovie.length)
          }}</span>
        </div>
        <p class="single-movie__text">{{ selectedMovie.description }}</p>
      </div>

      <div class="single-movie__image">
        <img :src="selectedMovie.poster_url" alt="" />
      </div>
    </div>
    <div class="movie-screening">Screenings to come</div>
  </div>
</template>

<style scoped lang="scss">
.single-movie {
  display: flex;
  gap: 25px;
  margin-top: 4.5em;
  width: 100%;
  height: 100%;

  &__description {
    width: 50%;
  }

  &__genre {
  }

  &__length {
    margin-left: 15px;
  }

  &__text {
    font-family: "Roboto Mono";
    font-weight: 400;
    font-size: 22px;
    line-height: 37px;
    letter-spacing: 0.015em;
    color: $tuna;
    margin: 32px 0px;
  }

  &__image {
    width: 50%;
    height: 100%;
    aspect-ratio: 16/9;
    img {
      max-width: 100%;
      min-width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  h1 {
    font-family: "Eczar";
    font-weight: 600;
    font-size: 80px;
    line-height: 82px;
    letter-spacing: -0.01em;
    color: $tuna;
    margin: 32px 0px;
  }
}
</style>
