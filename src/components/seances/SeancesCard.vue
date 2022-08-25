<script setup lang="ts">
import type { Movie } from "@/types/movie";
import type { Seance } from "@/types/seance";
withDefaults(
  defineProps<{
    movie: Movie;
    seances: Seance[];
  }>(),
  {
    movie: {
      title: "Title",
    },
    seances: () => [
      {
        datetime: "2022-08-25T12:00:00.000Z",
      },
    ],
  }
);
</script>

<template>
  <div>{{ movie.title }}</div>
  <div>
    <p v-for="seance in seances" :key="seance.id">
      {{ seance.datetime.substring(11, 16) }}
    </p>
  </div>
</template>

<style scoped lang="scss">
</style>
