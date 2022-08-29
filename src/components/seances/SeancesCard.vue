<script setup lang="ts">
import type { Movie } from "@/types/movie";
import type { Seance } from "@/types/seance";
withDefaults(
  defineProps<{
    movie: Movie;
    seances: Seance[];
  }>(),
  {}
);
</script>

<template>
  <template v-if="movie">
    <div>{{ movie.title }}</div>
    <div>
      <p v-for="seance in seances" :key="seance.id">
        {{ seance.datetime.substring(11, 16) }}
      </p>
    </div>
  </template>
  <template v-else> Nothing to show here... </template>
</template>

<style scoped lang="scss"></style>
