<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useBookingStore } from "@/stores/booking";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { getSingleReservation } from "@/api/reservationsService";
import ReservationItem from "@/components/reservations/ReservationItem.vue";
const bookingStore = useBookingStore();
const userStore = useUserStore();
const route = useRoute();

const queryReservation = computed(() => route.query.reservationId);
const selectedReservation = ref();

watch(queryReservation, async (newVal) => {
  const response = await getSingleReservation(newVal);
  console.log(response);
  selectedReservation.value = response;
});

// const bookedTickets = computed(() => {
//   return bookingStore.selectedTickets.map((ticket) => {
//     return {
//       ...ticket,
//       movie: bookingStore.selectedReservation.movie,
//       datetime: bookingStore.selectedReservation.datetime,
//     };
// //   });
// });
</script>

<template>
  <div class="success">
    <h1 class="success__title">
      Hell yeah! <br />
      <span class="success__title--red">You booked {{ 3 }} tickets</span>
    </h1>
    <div class="sucess__tickets">
      <!-- <ReservationItem -->
      <!--   v-for="ticket in bookedTickets" -->
      <!--   :key="ticket.seat" -->
      <!--   :ticket="ticket" -->
      <!-- /> -->
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
