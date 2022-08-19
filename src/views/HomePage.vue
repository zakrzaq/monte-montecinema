<script setup lang="ts">
import HeroSection from "@/components/home/HeroSection.vue";
import ComingSoon from "@/components/home/ComingSoon.vue";
</script>

<template>
  <HeroSection />
  <ComingSoon class="mt-64" />
</template>

<style scoped lang="scss">
// UTILITY
.mt-64 {
  margin-top: 64px;
}
</style>
