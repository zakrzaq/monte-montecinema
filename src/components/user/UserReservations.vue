<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getReservations } from "@/api/reservationsService";
import { useUserStore } from "@/stores/user";
import BaseCard from "../base/BaseCard.vue";
import ReservationItem from "@/components/reservations/ReservationItem.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import NoResults from "@/components/NoResults.vue";
const userStore = useUserStore();

const userReservations = ref();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    userReservations.value = await getReservations(userStore.user.email);
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
    <div v-if="userReservations" class="user-reservations">
      <BaseCard>
        <ReservationItem
          v-for="item in userReservations"
          :key="item.id"
          :reservation="item"
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
