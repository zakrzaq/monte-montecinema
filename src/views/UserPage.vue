<script setup lang="ts">
import UserTabs from "@/components/user/UserTabs.vue";
import UserDetails from "@/components/user/UserDetails.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <p>Hello {{ userStore.user?.first_name }}</p>
  <UserTabs />
  <UserDetails />
</template>

<style scoped lang="scss"></style>
