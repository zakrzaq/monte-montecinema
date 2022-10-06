<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
import reservationDatetime from "@/helpers/reservationDatetime";
import type { ShowTicket } from "@/types/reservations";
import BaseCell from "@/components/base/BaseCell.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseTag from "@/components/base/BaseTag.vue";
import BaseSpacer from "@/components/base/BaseSpacer.vue";


const props = defineProps<{
  ticket?: ShowTicket;
}>();
const userStore = useUserStore();

const reservationLayout = computed(() => {
  return isEmployee.value ? "reservation-item--employee" : "";
});
const isEmployee = computed(() => userStore.isEmployee);
</script>

<template>
  <div v-if="ticket" class="reservation-item" :class="reservationLayout">
    <BaseCell label="Movie">{{ ticket.movie }}</BaseCell>
    <BaseCell label="Seat">{{ ticket.seat }}</BaseCell>
    <BaseCell label="Time">{{ reservationDatetime(ticket.datetime) }}</BaseCell>
    <BaseCell label="Ticket Type">
      {{ ticket.type }} - ${{ ticket.price.slice(0, -2) }}
    </BaseCell>
    <BaseCell label="Email" v-if="isEmployee">{{ ticket.email }}</BaseCell>
    <BaseTag :value="ticket.status">{{ ticket.status }}</BaseTag>
    <BaseButton
      variant="breadcrumb"
      modifier="outlined"
      size="medium"
      v-if="ticket.status !== 'Cancelled'"
    >
      Remove
    </BaseButton>
    <BaseSpacer v-else />
    <BaseButton v-if="isEmployee" variant="primary" modifier="outlined">
      Confirm
    </BaseButton>
    <BaseSpacer v-else />
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
