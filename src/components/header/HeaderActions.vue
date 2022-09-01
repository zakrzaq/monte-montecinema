<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
import Hamburger from "@/assets/icons/hamburger.svg?component";
</script>

<template>
  <div class="actions">
    <div class="actions__buttons">
      <BaseButton button-type="secondary" to="#">Register</BaseButton>
      <BaseButton :to="{ name: 'LoginPage' }">Login</BaseButton>
    </div>
    <div class="actions__hamburger">
      <RouterLink to="#">
        <Hamburger class="hamburger" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.actions {
  @include flex-vcenter-hcenter;
  gap: 24px;

  &__buttons {
    @include flex-vcenter-hcenter;
    @include sm {
      display: none;
    }
    & .button {
      height: 48px;
      padding: 12px 24px;
      border-radius: 24px;
    }
  }

  &__hamburger {
    display: none;
    @include sm {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 15px;
    }
  }
}
</style>
