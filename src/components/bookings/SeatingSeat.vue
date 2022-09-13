<script setup lang="ts">
import { computed } from "vue";
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();

const props = defineProps<{
  letter: string;
  seat: string;
}>();
const emit = defineEmits<{
  (e: "addSeat", id: string): void;
}>();

const storeSelectedTickets = computed(() => {
  return bookingStore.selectedTickets.map((ticket) => ticket.seat);
});
const seatValue = computed(() => {
  return (letter: string, seat: string) => letter + seat;
});
const isSeatTaken = computed(() => {
  return (letter: string, seat: string) =>
    bookingStore.selectedReservation.taken_seats.includes(
      seatValue.value(letter, seat)
    );
});
const isSeatSelected = computed(() => {
  return (letter: string, seat: string) =>
    storeSelectedTickets.value.includes(seatValue.value(letter, seat));
});
</script>

<template>
  <button
    :value="seatValue(letter, seat)"
    :class="[
      'seat',
      isSeatTaken(letter, seat) ? 'seat--taken' : '',
      isSeatSelected(letter, seat) ? 'seat--selected' : '',
    ]"
    @click="emit('addSeat', ($event.target as HTMLInputElement).value)"
  >
    {{ seat }}
  </button>
</template>

<style scoped lang="scss">
.seat {
  background-color: $cosmos;
  @include flex-vcenter-hcenter;
  width: 32px;
  height: 32px;
  @include roboto-mono(normal, 500);
  font-size: 16px;
  line-height: 100%;
  color: $tuna;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &--taken {
    color: $snow-white;
    background-color: $jumbo;
    cursor: not-allowed;
  }

  &--selected {
    color: $snow-white;
    background-color: $cherry-red;
  }
}
</style>
