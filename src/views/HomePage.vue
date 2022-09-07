<script setup lang="ts">
import { useUiStore } from "@/stores/ui";
import HeroSection from "@/components/home/HeroSection.vue";
import ComingSoon from "@/components/home/ComingSoon.vue";
import AddressCard from "@/components/contact/AddressCard.vue";
import ScreeningPage from "@/views/ScreeningsPage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const uiStore = useUiStore();
</script>

<template>
  <LoadingSpinner v-if="uiStore.moviesLoading" />
  <div v-else class="home-page">
    <HeroSection />
    <ComingSoon class="mt-64" />
    <ScreeningPage class="mt-64" />
    <AddressCard class="mt-64" />
  </div>
</template>

<style scoped lang="scss">
.home-page {
  margin-bottom: 64px;
}
// UTILITY
.mt-64 {
  margin-top: 64px;
}
</style>
