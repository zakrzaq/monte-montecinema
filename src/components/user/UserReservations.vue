<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { getReservations } from "@/api/reservationsService";
import { useUserStore } from "@/stores/user";
import type { ShowTicket, Reservation } from "@/types/reservations";
import BaseCard from "@/components/base/BaseCard.vue";
import ReservationItem from "@/components/reservations/ReservationItem.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NoResults from "@/components/NoResults.vue";

const userStore = useUserStore();

const userReservations = ref<Reservation[]>();
const ticketList = ref<ShowTicket[]>([]);
const upcomingTickets = computed(() => {
  return ticketList.value.filter(
    (ticket: ShowTicket) => new Date(ticket.datetime) >= new Date()
  );
});
const pastTickets = computed(() => {
  return ticketList.value.filter(
    (ticket: ShowTicket) => new Date(ticket.datetime) < new Date()
  );
});
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    for (let i = 1; i <= 20; i++) {
      const response = await getReservations(userStore.user.email, i, 25);
      userReservations.value = userReservations.value
        ? [...userReservations.value, ...response]
        : response;
    }
    if (userReservations.value)
      userReservations.value.forEach((res) =>
        res.tickets.forEach((ticket) => {
          const next_ticket = {
            ...ticket,
            movie: res.movie_title,
            datetime: res.seance_datetime,
            status: res.status.name,
          } as ShowTicket;
          ticketList.value = [...ticketList.value, next_ticket];
        })
      );
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <template v-if="loading">
    <LoadingSpinner />
  </template>
  <template v-else>
    <div v-if="ticketList" class="user-reservations">
      <BaseCard card-width="100%">
        <h3 class="user-reservations__heading">Upcoming</h3>
        <template v-if="upcomingTickets">
          <ReservationItem
            v-for="ticket in upcomingTickets"
            :key="ticket.id"
            :ticket="ticket"
          />
        </template>
        <NoResults v-else>
          Sorry, we could not find any reservations...
        </NoResults>
        <h3
          class="user-reservations__heading user-reservations__heading--second"
        >
          Past
        </h3>
        <template v-if="pastTickets">
          <ReservationItem
            v-for="ticket in pastTickets"
            :key="ticket.id"
            :ticket="ticket"
          />
        </template>
        <NoResults v-else>
          Sorry, we could not find any reservations...
        </NoResults>
      </BaseCard>
    </div>
    <NoResults v-else> Sorry, we could not find any reservations... </NoResults>
  </template>
</template>

<style scoped lang="scss">
.user-reservations {
  :deep(.base-card) {
    width: 100%;
  }

  &__heading {
    margin-bottom: 40px;
    @include eczar(normal, 600);
    font-size: 24px;
    line-height: 102%;
    color: $tuna;

    &--second {
      margin-top: 80px;
    }
  }
}
</style>
