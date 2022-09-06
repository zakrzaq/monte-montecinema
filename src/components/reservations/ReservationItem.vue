<script setup lang="ts">
import type { Reservation } from "@/types/reservations";
const props = defineProps<{
  reservation: Reservation;
}>();
</script>

<template>
  <div class="reservation-item">{{ reservation.movie_title }}</div>
</template>

<style scoped lang="scss">
.reservation-item {
}
</style>
