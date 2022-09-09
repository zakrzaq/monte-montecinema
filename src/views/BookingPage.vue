<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useBookingStore } from "@/stores/booking";
import BookingTabs from "@/components/bookings/BookingTabs.vue";
import BookingHeader from "@/components/bookings/BookingHeader.vue";
import SeatingGrid from "@/components/bookings/SeatingGrid.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { ticketIds } from "@/api/ticketID";

const bookingStore = useBookingStore();

const selectedTab = ref("Choose seats");

const headerTitle = computed(() => {
  return `Choose your ${
    selectedTab.value === "Choose seats" ? "seats" : "tickets"
  }`;
});
const selectOptions = computed(() => {
  return ticketIds.map((ticket) => {
    return {
      id: ticket.id,
      title: `${ticket.type} - $${ticket.price.slice(0, -2)}`,
    };
  });
});

const handleChooseSeats = () => {
  if (bookingStore.selectedTickets.length > 0) {
    selectedTab.value = "Book tickets";
    console.log(bookingStore.selectedTickets);
  }
};

onMounted(async () => {
  bookingStore.selectedTickets = [];
});
</script>

<template>
  <div>
    <BookingTabs @selected="(val) => (selectedTab = val)" />
    <h1>{{ headerTitle }}</h1>
    <BookingHeader
      v-if="bookingStore.selectedReservation"
      :movie_id="bookingStore.selectedReservation.movie"
    />
    <template v-if="selectedTab === 'Choose seats'">
      <SeatingGrid />
      <BaseCard width="100%">
        <BaseButton
          :disabled="bookingStore.selectedTickets.length === 0"
          size="large"
          type="secondary"
          modifier="outlined"
          @click="handleChooseSeats"
        >
          Choose seats
        </BaseButton>
      </BaseCard>
    </template>
    <template v-else-if="selectedTab === 'Book tickets'">
      <div>
        <div
          class="tickets-list"
          v-for="(ticket, index) in bookingStore.selectedTickets"
          :key="ticket.seat"
        >
          <BaseInput
            :disabled="true"
            v-model="bookingStore.selectedTickets[index].seat"
          >
            Seat
          </BaseInput>
          <BaseSelect
            :options="selectOptions"
            v-model="bookingStore.selectedTickets[index].ticket_type_id"
            >Ticket type</BaseSelect
          >
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.tickets-list {
  display: grid;
  grid-template: 1fr / 200px 400px;

  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
}
</style>
