<script setup lang="ts">
import { computed } from "vue";
import { useBookingStore } from "@/stores/booking";
import BaseCard from "@/components/base/BaseCard.vue";
import SeatingSeat from "@/components/bookings/SeatingSeat.vue";
import SeatingLabels from "@/components/bookings/SeatingLabels.vue";

const bookingStore = useBookingStore();

const allSeats = computed(() => {
  return bookingStore.selectedReservation
    ? [
        ...bookingStore.selectedReservation.available_seats,
        ...bookingStore.selectedReservation.taken_seats,
      ]
    : [];
});
const rowLetters = computed(() => {
  const firstChars = allSeats.value.map((seat) => seat.substring(0, 1));
  return [...new Set(firstChars)].sort();
});
const rowNumbers = computed(() => {
  return allSeats.value
    .filter((str: string) => str.includes("A"))
    .map((str: string) => str.substring(1))
    .sort(function (a, b) {
      return +a - +b;
    });
});
const selectedSeats = computed(() => {
  return bookingStore.selectedTickets.map((ticket) => ticket.seat);
});

const addSeat = (seat: string) => {
  if (bookingStore.selectedReservation.taken_seats.includes(seat)) return;
  if (selectedSeats.value.includes(seat)) {
    bookingStore.selectedTickets = bookingStore.selectedTickets.filter(
      (ticket) => ticket.seat !== seat
    );
  } else {
    bookingStore.selectedTickets = [
      ...bookingStore.selectedTickets,
      { seat: seat, ticket_type_id: 1 },
    ];
  }
};
</script>

<template>
  <BaseCard card-width="100%">
    <div class="seating-hall">
      <SeatingLabels :letters="rowLetters" />
      <div class="seating-hall__hall">
        <div
          v-for="letter in rowLetters"
          :key="letter"
          :letter="letter"
          class="seating-hall__row"
        >
          <SeatingSeat
            v-for="number in rowNumbers"
            :key="number"
            :seat="number"
            :letter="letter"
            @add-seat="addSeat"
          />
        </div>
      </div>
      <SeatingLabels :letters="rowLetters" />
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.seating-hall {
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 50px 1fr 50px;

  &__row {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  :deep(.base-card) {
    width: 100%;
  }

  &__hall {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
