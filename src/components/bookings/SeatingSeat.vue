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
  return props.letter + props.seat;
});
const isSeatTaken = computed(() => {
  return bookingStore.selectedReservation.taken_seats.includes(seatValue.value);
});
const isSeatSelected = computed(() => {
  return storeSelectedTickets.value.includes(seatValue.value);
});
</script>

<template>
  <button
    :value="seatValue"
    :class="[
      'seat',
      isSeatTaken ? 'seat--taken' : '',
      isSeatSelected ? 'seat--selected' : '',
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
