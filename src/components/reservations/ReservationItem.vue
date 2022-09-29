<script setup lang="ts">
import { computed } from "vue";
import reservationDatetime from "@/helpers/reservationDatetime";
import type { ShowTicket } from "@/types/reservations";
import BaseCell from "@/components/base/BaseCell.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseTag from "@/components/base/BaseTag.vue";

const props = withDefaults(
  defineProps<{
    ticket?: ShowTicket;
    employee: boolean;
  }>(),
  {
    employee: false,
  }
);

const reservationLayout = computed(() => {
  return props.employee ? "reservation-item--employee" : "";
});
</script>

<template>
  <div v-if="ticket" class="reservation-item" :class="reservationLayout">
    <BaseCell label="Movie">{{ ticket.movie }}</BaseCell>
    <BaseCell label="Seat">{{ ticket.seat }}</BaseCell>
    <BaseCell label="Time">{{ reservationDatetime(ticket.datetime) }}</BaseCell>
    <BaseCell label="Ticket Type">
      {{ ticket.type }} - ${{ ticket.price.slice(0, -2) }}
    </BaseCell>
    <BaseCell label="Email" v-if="employee">{{ ticket.email }}</BaseCell>
    <BaseTag :value="ticket.status">{{ ticket.status }}</BaseTag>
    <BaseButton
      variant="breadcrumb"
      modifier="outlined"
      size="medium"
      v-if="ticket.status !== 'Cancelled'"
    >
      Remove
    </BaseButton>
    <BaseButton variant="primary" modifier="outlined"> Confirm </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.reservation-item {
  display: grid;
  grid-template-columns: 2fr 0.5fr 2fr 0.75fr 1fr 1fr;
  width: 100%;
  align-items: center;

  &--employee {
    grid-template-columns: 1.75fr 0.5fr 2fr 0.75fr 1fr 0.7fr 0.7fr 0.7fr;
  }

  :deep(.button) {
    max-width: 96px;
  }
}
</style>
