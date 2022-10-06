<script setup lang="ts">
import { computed, watch, ref, onMounted } from "vue";
import { useBookingStore } from "@/stores/booking";
import { useMovieStore } from "@/stores/movies";
import { useTitle } from "@vueuse/core";
import ReservationItem from "@/components/reservations/ReservationItem.vue";
const bookingStore = useBookingStore();
const movieStore = useMovieStore()
useTitle("Moneterail | Your reservation");

const selectedMovie = computed(() => {
  return movieStore.movieById(bookingStore.selectedReservation.movie) || ''
})
const bookedTickets = computed(() => {
  return bookingStore.selectedTickets.map((ticket) => {
    return {
      ...ticket,
      id: ticket.seat,
      status: 'Confirmed',
      datetime: bookingStore.selectedReservation.datetime,
      movie: selectedMovie.value.title,
      email: 'sample@email.com',
      price: '20.00'
    }
  })
})
</script>

<template>
  <div class="success">
    <h1 class="success__title">
      Hell yeah! <br />
      <span class="success__title--red">You booked {{ bookedTickets.length }} tickets</span>
    </h1>
    <div v-if="bookedTickets" class="sucess__tickets">
      <ReservationItem
        v-for="ticket in bookedTickets"
        :key="ticket.seat"
        :ticket="ticket"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
