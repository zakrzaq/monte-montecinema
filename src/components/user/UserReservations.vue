<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getReservations } from "@/api/reservationsService";
import { useUserStore } from "@/stores/user";
import BaseCard from "@/components/base/BaseCard.vue";
import ReservationItem from "@/components/reservations/ReservationItem.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NoResults from "@/components/NoResults.vue";
import type { ShowTicket } from "@/types/reservations";
const userStore = useUserStore();

const userReservations = ref();
const ticketList = ref<[] | ShowTicket[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getReservations(userStore.user.email);
    userReservations.value = response;
    response.forEach((res) =>
      res.tickets.forEach((ticket) => {
        const next_ticket = {
          ...ticket,
          movie: res.movie_title,
          datetime: res.seance_datetime,
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
      <BaseCard>
        <ReservationItem
          v-for="ticket in ticketList"
          :key="ticket.id"
          :ticket="ticket"
        ></ReservationItem>
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
}
</style>
