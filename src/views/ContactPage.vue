<script setup lang="ts">
import ContactCard from "@/components/contact/ContactCard.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
</script>

<template>
  <div class="contact-page">
    <BreadCrumb first-title="Contact us" />
    <h1 class="contact-page__header heading-1">Contact Us</h1>
    <ContactCard first-title="Contact us" />
  </div>
</template>

<style scoped lang="scss">
.contact-page {
  &__header {
    margin: 64px;
  }
}
</style>
