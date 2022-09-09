<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useBookingStore } from "@/stores/booking";
import BaseCard from "../base/BaseCard.vue";
import SeatingSeat from "@/components/bookings/SeatingSeat.vue";
import SeatingRow from "@/components/bookings/SeatingRow.vue";
import SeatingLabels from "@/components/bookings/SeatingLabels.vue";
import type { TempTicket } from "@/types/reservations";
const bookingStore = useBookingStore();

const storeSelectedTickets = computed(() => {
  return bookingStore.selectedTickets.map((ticket) => ticket.seat);
});
const selectedSeats = ref<string[]>(storeSelectedTickets.value);
const selectedTickets = ref<TempTicket[]>([]);

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
  return [...new Set(firstChars.map((seat) => seat))].sort();
});
const rowNumbers = computed(() => {
  return allSeats.value
    .filter((str: string) => str.includes("A"))
    .map((str: string) => str.substring(1))
    .sort(function (a, b) {
      return +a - +b;
    });
});

const addSeat = (seat: string) => {
  if (bookingStore.selectedReservation.taken_seats.includes(seat)) return;
  if (selectedSeats.value.includes(seat)) {
    const index = selectedSeats.value.indexOf(seat);
    selectedSeats.value.splice(index, 1);
  } else {
    selectedTickets.value.push({ seat: seat, ticket_type_id: 1 });
  }
};

watch(selectedTickets.value, (newVal) => {
  bookingStore.selectedTickets = newVal;
});
</script>

<template>
  <BaseCard width="100%">
    <div class="seating-hall">
      <SeatingLabels :letters="rowLetters" />
      <div class="seating-hall__hall">
        <SeatingRow
          v-for="letter in rowLetters"
          :key="letter"
          :letter="letter"
          class="row"
        >
          <SeatingSeat
            v-for="number in rowNumbers"
            :key="number"
            :seat="number"
            :letter="letter"
            @add-seat="addSeat"
          />
        </SeatingRow>
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
