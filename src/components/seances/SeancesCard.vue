<script setup lang="ts">
import { useRouter } from "vue-router";
import { useBookingStore } from "@/stores/booking";
import { getSeanceById } from "@/api/seancesService";

import lengthToTime from "@/helpers/lengthToTime";
import BaseButton from "@/components/base/BaseButton.vue";
import NoResults from "@/components/NoResults.vue";
import type { MovieWithSeances, Seance } from "@/types/seance";
const router = useRouter();
const bookingStore = useBookingStore();

defineProps<{
  movie: MovieWithSeances;
}>();

const handleBooking = async (seance: Seance) => {
  bookingStore.selectedSeance = seance;
  bookingStore.selectedReservation = await getSeanceById(seance.id);
  bookingStore.selectedTickets = [];
  await router.push({
    name: "BookingPage",
  });
};
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
          <template v-if="movie.screenings.length > 0">
            <BaseButton
              v-for="seance in movie.screenings"
              :key="seance.id"
              type="primary"
              modifier="outlined"
              size="medium"
              @click="handleBooking(seance)"
            >
              {{ seance.datetime.substring(11, 16) }}
            </BaseButton>
          </template>
          <NoResults v-else>
            Sorry, there is no screenings for {{ movie.title }} ton this day.
          </NoResults>
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
