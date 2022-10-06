<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/base/BaseButton.vue";
import Hamburger from "@/assets/icons/hamburger.svg?component";
import LocalePicker from "@/components/header/LocalePicker.vue";

const userStore = useUserStore();
const router = useRouter();
const { t } = useI18n();

const loginButtonLabel = computed(() => {
  return userStore.isLoggedIn
    ? t("header.actions.logout")
    : t("header.actions.login");
});

const handleLogin = () => {
  if (!userStore.isLoggedIn) {
    userStore.logout();
    router.push({ name: "LoginPage" });
  } else {
    router.push({ name: "LoginPage" });
  }
};
</script>

<template>
  <div class="actions">
    <div class="actions__buttons">
      <LocalePicker />
      <BaseButton variant="secondary" :to="{ name: 'RegisterPage' }">
        {{ $t("header.actions.register") }}
      </BaseButton>
      <BaseButton @click="handleLogin">
        {{ loginButtonLabel }}
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
