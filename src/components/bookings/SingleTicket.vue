<script setup lang="ts">
import { computed } from "vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { ticketIds } from "@/api/ticketID";
import type { TempTicket } from "@/types/reservations";
const props = defineProps<{
  ticket?: TempTicket;
}>();

const selectOptions = computed(() => {
  return ticketIds.map((ticket) => {
    return {
      id: ticket.id,
      title: `${ticket.type} - $${ticket.price.slice(0, -2)}`,
    };
  });
});
//
const seatDescription = computed(() => {
  return `Row ${props.ticket?.seat.substring(
    0,
    1
  )}, Seat ${props.ticket?.seat.substring(1)}`;
});
</script>

<template>
  <div class="single-ticket">
    <BaseInput :disabled="true" :model-value="seatDescription">Seat</BaseInput>
    <BaseSelect :options="selectOptions">Ticket type</BaseSelect>
  </div>
</template>

<style scoped lang="scss">
.single-ticket {
  display: grid;
  grid-template-columns: 200px 400px;
  gap: 15px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;

  :deep(.button) {
    max-width: 96px;
  }
}
</style>
