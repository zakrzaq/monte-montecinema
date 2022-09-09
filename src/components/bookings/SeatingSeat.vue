<script setup lang="ts">
import { computed } from "vue";
import { useBookingStore } from "@/stores/booking";
const bookingStore = useBookingStore();
defineProps<{
  letter: string;
  seat: string;
}>();
const emit = defineEmits(["addSeat"]);

const storeSelectedTickets = computed(() => {
  return bookingStore.selectedTickets.map((ticket) => ticket.seat);
});
</script>

<template>
  <button
    :value="`${letter}${seat}`"
    :class="[
      'seat',
      bookingStore.selectedReservation.taken_seats.includes(`${letter}${seat}`)
        ? 'seat--taken'
        : '',
      storeSelectedTickets.includes(`${letter}${seat}`) ? 'seat--selected' : '',
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
