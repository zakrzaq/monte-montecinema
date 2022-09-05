<script setup lang="ts">
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <div>
    <h1>User page</h1>
    <p>Hello {{ userStore.user?.first_name }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
