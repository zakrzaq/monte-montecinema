<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { getReservations } from "@/api/reservationsService";
import BreadCrumb from "@/components/BreadCrumb.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ReservationItem from "@/components/reservations/ReservationItem.vue";
import type { ShowTicket, Reservation } from "@/types/reservations";

const userStore = useUserStore();
const loading = ref(false);
const currentReservations = ref<Reservation[]>([]);
const currentTickets = ref<ShowTicket[]>([]);

const deskNumberBreadcrumb = computed(() => {
  return "Desk " + userStore.selectedDesk;
});

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getReservations("", 1, 25);
    currentReservations.value = currentReservations.value
      ? [...currentReservations.value, ...response]
      : response;
    if (currentReservations.value)
      currentReservations.value.forEach((res) =>
        res.tickets.forEach((ticket) => {
          const next_ticket = {
            ...ticket,
            movie: res.movie_title,
            datetime: res.seance_datetime,
            status: res.status.name,
            email: res.user_email,
          } as ShowTicket;
          currentTickets.value = [...currentTickets.value, next_ticket];
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
  <BreadCrumb backPath="/empl" :first-title="deskNumberBreadcrumb" />
  <div>
    <ReservationItem
      v-for="ticket in currentTickets"
      :key="ticket.id"
      :ticket="ticket"
      :employee="true"
    />
  </div>
</template>

<style scoped lang="scss"></style>
