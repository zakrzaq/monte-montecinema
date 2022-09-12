<script setup lang="ts">
import reservationDatetime from "@/helpers/reservationDatetime";
import BaseCell from "@/components/base/BaseCell.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseTag from "@/components/base/BaseTag.vue";
import type { ShowTicket } from "@/types/reservations";
defineProps<{
  ticket?: ShowTicket;
}>();
</script>

<template>
  <div v-if="ticket" class="reservation-item">
    <BaseCell label="Movie">{{ ticket.movie }}</BaseCell>
    <BaseCell label="Seat">{{ ticket.seat }}</BaseCell>
    <BaseCell label="Time">{{ reservationDatetime(ticket.datetime) }}</BaseCell>
    <BaseCell label="Ticket Type">
      {{ ticket.type }} - ${{ ticket.price.slice(0, -2) }}
    </BaseCell>
    <BaseTag :value="ticket.status">{{ ticket.status }}</BaseTag>
    <BaseButton
      type="breadcrumb"
      modifier="outlined"
      size="medium"
      v-if="ticket.status !== 'Cancelled'"
    >
      Remove
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.reservation-item {
  display: grid;
  grid-template-columns: 2fr 0.5fr 2fr 0.75fr 1fr 1fr;
  width: 100%;
  align-items: center;

  :deep(.button) {
    max-width: 96px;
  }
}
</style>
