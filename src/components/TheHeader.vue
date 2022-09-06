<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import LogoImage from "@/assets/images/logo.svg?component";
import HeaderActions from "@/components/header/HeaderActions.vue";
import AuthActions from "@/components/header/AuthActions.vue";
import HeaderLinks from "@/components/header/HeaderLinks.vue";
import HeaderBanner from "@/components/header/HeaderBanner.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const userStore = useUserStore();

const loginView = computed(() => {
  return (
    route.matched.some((el) => el.path === "/login") ||
    route.matched.some((el) => el.path === "/register")
  );
});

const showHeaderForLoggedUser = computed(() => {
  return !loginView.value && !userStore.isLoggedIn;
});
const showHeaderForNotLoggedUser = computed(() => {
  return !loginView.value && userStore.isLoggedIn;
});
</script>

<template>
  <header class="header">
    <RouterLink :to="{ name: 'HomePage' }" class="logo">
      <LogoImage />
    </RouterLink>
    <template v-if="showHeaderForLoggedUser">
      <HeaderLinks />
      <HeaderActions />
    </template>
    <template v-else-if="showHeaderForNotLoggedUser">
      <HeaderLinks />
      <AuthActions />
    </template>
    <HeaderBanner v-if="loginView" />
  </header>
</template>

<style scoped lang="scss">
.header {
  @include flex-vcenter-hcenter;
  justify-content: space-between;
  height: 112px;

  & .logo {
    min-width: 114px;

    @include sm {
      padding-left: 15px;
    }
  }
}
</style>
