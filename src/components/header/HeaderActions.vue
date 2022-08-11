<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
</script>

<template>
  <div class="actions">
    <RouterLink to="#">
      <BaseButton button-type="secondary">Register</BaseButton>
    </RouterLink>
    <RouterLink to="#">
      <BaseButton>Login</BaseButton>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.actions {
  @include jcc-aic;
  gap: 24px;

  .button {
    height: 48px;
    padding: 12px 24px;
    border-radius: 24px;
  }
}
</style>
