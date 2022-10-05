<script setup lang="ts">
import { ref, computed } from "vue";
import { useBookingStore } from "@/stores/booking";
import { postReservation } from "@/api/reservationsService";
import { useTitle } from "@vueuse/core";
import BookingTabs from "@/components/bookings/BookingTabs.vue";
import BookingHeader from "@/components/bookings/BookingHeader.vue";
import SeatingGrid from "@/components/bookings/SeatingGrid.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { ticketIds } from "@/api/ticketID";
const bookingStore = useBookingStore();
useTitle("Montecinema | Book your tickets");
const selectedTab = ref("Choose seats");

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
  }
};
const handleBookTickets = async () => {
  const selectionData = {
    seance_id: bookingStore.selectedReservation.id,
    tickets: bookingStore.selectedTickets,
  };
  await postReservation(selectionData);
};
const setSelectedTab = (val: string) => {
  selectedTab.value = val;
};
</script>

<template>
  <div>
    <BookingTabs @selected="setSelectedTab" />
    <h1>
      {{
        `Choose your ${selectedTab === "Choose seats" ? "seats" : "tickets"}`
      }}
    </h1>
    <BookingHeader
      v-if="bookingStore.selectedReservation"
      :movie_id="bookingStore.selectedReservation.movie"
    />
    <template v-if="selectedTab === 'Choose seats'">
      <SeatingGrid />
      <div class="reservations__controls reservations__controls--choose">
        <BaseButton
          :disabled="bookingStore.selectedTickets.length === 0"
          size="large"
          variant="secondary"
          modifier="outlined"
          @click="handleChooseSeats"
        >
          Choose seats
        </BaseButton>
      </div>
    </template>
    <template v-else-if="selectedTab === 'Book tickets'">
      <div>
        <div
          class="reservations__tickets-list"
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
      <div class="reservations__controls reservations__controls--book">
        <BaseButton
          size="large"
          variant="secondary"
          modifier="outlined"
          @click="selectedTab = 'Choose seats'"
        >
          Go back
        </BaseButton>
        <BaseButton
          size="large"
          variant="secondary"
          modifier="outlined"
          @click="handleBookTickets"
        >
          Book tickets
        </BaseButton>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.reservations {
  &__controls {
    display: flex;
    &--choose {
      justify-content: flex-end;
      margin: 64px 0;
    }
    &--book {
      justify-content: space-between;
    }
  }
  &__tickets-list {
    display: grid;
    grid-template: 1fr / 200px 400px;

    align-items: flex-start;
    justify-content: flex-start;
    gap: 15px;
  }
}
</style>
