<script setup lang="ts">
import { ref } from "vue";
import { useTitle } from "@vueuse/core";

import UserTabs from "@/components/user/UserTabs.vue";
import UserDetails from "@/components/user/UserDetails.vue";
import UserReservations from "@/components/user/UserReservations.vue";

useTitle("Montecinema | Account");
const selectedTab = ref("Personal details");
</script>

<template>
  <UserTabs @selected="(val) => (selectedTab = val)" />
  <UserDetails v-if="selectedTab === 'Personal details'" />
  <UserReservations v-else />
</template>

<style scoped lang="scss"></style>
