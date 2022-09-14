<script setup lang="ts">
import { computed } from "vue";
import { useMovieStore } from "@/stores/movies";
import { useBookingStore } from "@/stores/booking";
import lengthToTime from "@/helpers/lengthToTime";
import { prettyDate } from "@/helpers/prettyDate";
import BaseTag from "@/components/base/BaseTag.vue";
import NoResults from "@/components/NoResults.vue";

const movieStore = useMovieStore();
const bookingStore = useBookingStore();

const props = defineProps<{
  movie_id: number;
}>();

const movie = computed(() => {
  return movieStore.movieById(props.movie_id);
});
</script>

<template>
  <template v-if="movie">
    <div class="booking">
      <div class="booking__poster">
        <img :src="movie.poster_url" :alt="`${movie.title} poster`" />
      </div>
      <div class="booking__details">
        <h3 class="booking__title">{{ movie.title }}</h3>
        <div class="booking__info">
          <p class="booking__genre">{{ movie.genre.name }}</p>
          <p class="booking__length">{{ lengthToTime(movie.length) }}</p>
        </div>
        <BaseTag size="large" type="booking">{{
          prettyDate(bookingStore.selectedReservation.datetime, 1)
        }}</BaseTag>
      </div>
    </div>
  </template>
  <NoResults v-else> Nothing to show here... </NoResults>
</template>

<style scoped lang="scss">
.booking {
  margin-bottom: 40px;
  display: grid;
  grid-template: 1fr / 200px 1fr;
  background: $snow-white;
  box-shadow: $card-box-shadow;
  border-radius: 8px;

  &__poster {
    padding: 40px;
    img {
      max-width: 100px;
      height: auto;
    }
  }

  &__details {
    padding: 40px 40px 40px 0;
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

  :deep(.base-tag) {
    display: inline-block;
  }
}
</style>
