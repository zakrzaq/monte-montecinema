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
const isEmployee = computed(() => {
  return userStore.isEmployee;
});
const brandRoute = computed(() => {
  return isEmployee.value ? { name: "EmployeePage" } : { name: "HomePage" };
});
</script>

<template>
  <header class="header">
    <RouterLink :to="brandRoute" class="logo">
      <LogoImage />
    </RouterLink>
    <template v-if="showHeaderForLoggedUser">
      <HeaderLinks v-if="!isEmployee" />
      <HeaderActions />
    </template>
    <template v-else-if="showHeaderForNotLoggedUser">
      <HeaderLinks v-if="!isEmployee" />
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
