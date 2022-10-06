<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useBookingStore } from "@/stores/booking";
import { useMovieStore } from "@/stores/movies";
import { useUserStore } from "@/stores/user";
import { useTitle } from "@vueuse/core";
import { getTicketById } from "@/api/ticketID"
import ReservationItem from "@/components/reservations/ReservationItem.vue";
import BaseButton from "@/components/base/BaseButton.vue";
const router = useRouter()
const bookingStore = useBookingStore();
const movieStore = useMovieStore()
const userStore = useUserStore()
useTitle("Moneterail | Your reservation");

const selectedMovie = computed(() => {
  return movieStore.movieById(bookingStore.selectedReservation.movie) || {title: ''}
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
      price: getTicketById(ticket.ticket_type_id)?.price || '',
      type: getTicketById(ticket.ticket_type_id)?.type || '',
      }
  })
})
const ctaText = computed(() => {
  return userStore.isEmployee ? 'Go to ticket desk' : 'Go to homepage'
})

const handleCta = () => {
  userStore.isEmployee ? router.push({ name: 'EmployeePage'}) : router.push({ name: 'HomePage'})
}
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
    <div class="success__buttons">
      <BaseButton size="medium" @click="handleCta">{{ ctaText }}</BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.success {
  width: 100%;
  &__buttons {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 50px
  }
}
</style>
