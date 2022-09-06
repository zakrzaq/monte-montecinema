<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
import Hamburger from "@/assets/icons/hamburger.svg?component";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <div class="actions">
    <div class="actions__buttons">
      <BaseButton type="secondary" @click="userStore.logout">
        Log out
      </BaseButton>
      <BaseButton type="account" :to="{ name: 'UserPage' }">
        My account
      </BaseButton>
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
    gap: 10px;
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
