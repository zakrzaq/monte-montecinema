<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getReservations } from "@/api/reservationsService";
import createTicketList from "@/helpers/createTicketList";
import { useUserStore } from "@/stores/user";
import { useTitle } from "@vueuse/core";
import { useRouter } from "vue-router";
import BreadCrumb from "@/components/BreadCrumb.vue";
import NoResults from "@/components/NoResults.vue";
import ReservationItem from "@/components/reservations/ReservationItem.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import type { ShowTicket } from "@/types/reservations";
import BaseButton from "@/components/base/BaseButton.vue";

const userStore = useUserStore();
const router = useRouter();
useTitle("Montecinema | Reservations overview");

const ticketList = ref();
const loading = ref(false);
const query = ref("");

const deskNumberBreadcrumb = computed(() => {
  return "Desk " + userStore.selectedDesk;
});
const filteredTickets = computed(() => {
  return query.value
    ? ticketList.value.filter((item: ShowTicket) => {
        return item.email.toLowerCase().includes(query.value);
      })
    : ticketList.value;
});

const handleCreateReservation = () => {
  router.push({ name: "ScreeningsPage" });
};

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
  <div class="do-work">
    <BreadCrumb backPath="/empl" :first-title="deskNumberBreadcrumb" />
    <div class="do-work__heading">
      <h1 class="heading-1">Do your work</h1>
      <BaseButton size="medium" @click="handleCreateReservation"
        >Create a reservation</BaseButton
      >
    </div>
    <div class="do-work__search">
      <BaseInput v-model="query" type="search"> Search by email </BaseInput>
    </div>
    <div v-if="filteredTickets && !loading" class="do-work__results">
      <ReservationItem
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        :ticket="ticket"
      />
    </div>
    <LoadingSpinner v-else-if="loading" />
    <NoResults v-else>No results</NoResults>
  </div>
</template>

<style scoped lang="scss">
.do-work {
  &__heading {
    margin-bottom: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__search {
    width: 66%;
  }
  &__results {
    margin-bottom: 64px;
  }
}
</style>
