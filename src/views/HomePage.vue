<script setup lang="ts">
import HeroSection from "@/components/home/HeroSection.vue";
import ComingSoon from "@/components/home/ComingSoon.vue";
import ContactCard from "@/components/contact/ContactCard.vue";
</script>

<template>
  <div class="home-page">
  <HeroSection />
  <ComingSoon class="mt-64" />
  <ContactCard class="mt-64" />
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
