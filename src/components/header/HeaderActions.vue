<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
</script>

<template>
  <div class="actions">
    <BaseButton button-type="secondary" to="#">Register</BaseButton>
    <BaseButton to="#">Login</BaseButton>
  </div>
</template>

<style scoped lang="scss">
.actions {
  @include flex-vcenter-hcenter;
  gap: 24px;

  @include sm {
    display: none;
  }

  .button {
    height: 48px;
    padding: 12px 24px;
    border-radius: 24px;
  }
}
</style>
