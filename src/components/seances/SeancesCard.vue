<script setup lang="ts">
import lengthToTime from "@/helpers/lengthToTime";
import BaseButton from "../base/BaseButton.vue";
import type { Movie } from "@/types/movie";
import type { Seance } from "@/types/seance";
withDefaults(
  defineProps<{
    movie: Movie | undefined;
    seances: Seance[];
  }>(),
  {}
);
</script>

<template>
  <template v-if="movie">
    <div class="seance-card">
      <div class="seance-card__poster">
        <img :src="movie.poster_url" :alt="`${movie.title} poster`" />
      </div>
      <div class="seance-card__details">
        <h3 class="seance-card__title">{{ movie.title }}</h3>
        <div class="seance-card__info">
          <p class="seance-card__genre">{{ movie.genre.name }}</p>
          <p class="seance-card__length">{{ lengthToTime(movie.length) }}</p>
        </div>
        <div class="seance-card__times">
          <BaseButton
            v-for="seance in seances"
            :key="seance.id"
            to="#"
            type="primary"
            modifier="outlined"
            size="medium"
          >
            {{ seance.datetime.substring(11, 16) }}
          </BaseButton>
        </div>
      </div>
    </div>
  </template>
  <template v-else> Nothing to show here... </template>
</template>

<style scoped lang="scss">
.seance-card {
  margin-bottom: 40px;
  display: grid;
  grid-template: 1fr / 200px 1fr;
  background: $snow-white;
  box-shadow: $card-box-shadow;
  border-radius: 8px;

  &__poster {
    padding: 40px;
    img {
      max-width: 130px;
      height: auto;
    }
  }

  &__details {
    padding: 40px;
  }

  &__title {
    @include roboto(normal, 700);
    font-size: 24px;
    line-height: 28px;
    color: $tuna;
  }

  &__info {
    margin-top: 12px;
    margin-bottom: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
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

  &__times {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
}
</style>
