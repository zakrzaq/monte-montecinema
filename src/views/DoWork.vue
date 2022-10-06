<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getReservations } from "@/api/reservationsService";
import createTicketList from "@/helpers/createTicketList";
import { useUserStore } from "@/stores/user";
import BreadCrumb from "@/components/BreadCrumb.vue";
import NoResults from "@/components/NoResults.vue";
import ReservationItem from "@/components/reservations/ReservationItem.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import type { ShowTicket } from "@/types/reservations";

const userStore = useUserStore();

const ticketList = ref();
const loading = ref(false);
const query = ref("");

const deskNumberBreadcrumb = computed(() => {
  return "Desk " + userStore.selectedDesk;
});
const filteredTickets = computed(() => {
  return query.value
    ? ticketList.value.filter((item: ShowTicket) => {
        item.email.toLowerCase().includes(query.value);
      })
    : ticketList.value;
});

onMounted(async () => {
  try {
    loading.value = true;
    const response = await getReservations("");
    ticketList.value = createTicketList(response);
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
    <input v-model="query" type="text" />
  </div>
  <div v-if="filteredTickets && !loading">
    <ReservationItem
      v-for="ticket in filteredTickets"
      :key="ticket.id"
      :ticket="ticket"
    />
  </div>
  <LoadingSpinner v-else-if="loading" />
  <NoResults v-else>No results</NoResults>
</template>

<style scoped lang="scss"></style>
