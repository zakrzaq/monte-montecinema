<script setup lang="ts">
import lengthToTime from "@/helpers/lengthToTime";
import type { Movie } from "@/types/movie";
const props = withDefaults(
  defineProps<{
    movie: Movie;
    to?:
    | string
    | {
      name: string;
      params: {
        id: string | number;
      };
    };
  }>(),
  {
    to: "",
  }
);
</script>

<template>
  <RouterLink :to="to" class="movie">
    <div class="movie__title">
      <p>
        {{ props.movie.title }}
      </p>
    </div>
    <p class="movie__length">{{ lengthToTime(props.movie.length) }}</p>
    <img class="movie__poster" :src="props.movie.poster_url" alt="poster" />
    <p class="movie__genre">{{ props.movie.genre.name }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">
.movie {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  width: 100%;
  min-width: 400px;
  height: 100%;
  background: $snow-white;
  box-shadow: $card-box-shadow;
  border-radius: 8px;

  @include sm {
    min-width: unset;
    max-width: 325px;
    margin: 0 24px;
  }

  &__title {
    @include roboto(normal, 700);
    font-size: 36px;
    line-height: 42px;
    display: block;
    color: $tuna;
    height: 84px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__poster {
    margin-top: 16px;
    margin-bottom: 28px;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  &__length {
    @include roboto(normal, 700);
    font-size: 14px;
    line-height: 16px;
    color: $jumbo;
  }

  &__genre {
    padding: 8px 16px;
    background: $wisp-pink;
    border-radius: 24px;
    @include roboto(normal, 700);
    font-size: 14px;
    line-height: 16px;
    color: $bitter-sweet;
    display: block;
  }
}
</style>
