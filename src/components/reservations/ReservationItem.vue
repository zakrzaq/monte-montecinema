<script setup lang="ts">
import reservationDatetime from "@/helpers/reservationDatetime";
import BaseCell from "../base/BaseCell.vue";
import type { ShowTicket } from "@/types/reservations";
defineProps<{
  ticket: ShowTicket;
}>();
</script>

<template>
  <div class="reservation-item">
    <BaseCell label="Movie">{{ ticket.movie }}</BaseCell>
    <BaseCell label="Seat">{{ ticket.seat }}</BaseCell>
    <BaseCell label="Time">{{ reservationDatetime(ticket.datetime) }}</BaseCell>
    <BaseCell label="Ticket Type"
      >{{ ticket.type }} - ${{ ticket.price.slice(0, -2) }}</BaseCell
    >
  </div>
</template>

<style scoped lang="scss">
.reservation-item {
  display: grid;
  grid-template-columns: 350px 60px 300px 100px;
  width: 100%;
}
</style>
