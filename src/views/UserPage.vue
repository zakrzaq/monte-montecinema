<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import UserTabs from "@/components/user/UserTabs.vue";
const userStore = useUserStore();
const selectedTab = ref("Personal details");
</script>

<template>
  <p>Hello {{ userStore.user?.first_name }}</p>
  <div class="user-page">
    <UserTabs v-model="selectedTab" />
  </div>
</template>

<style scoped lang="scss"></style>
