<script setup lang="ts">
import ContactCard from "@/components/contact/ContactCard.vue";
</script>

<template>
  <div class="contact-page">
    <h1 class="contact-page__header heading-1">Contact Us</h1>
    <ContactCard />
  </div>
</template>

<style scoped lang="scss">
.contact-page {
  margin-top: 64px;

  &__header {
    margin-bottom: 64px;
  }
}
</style>
