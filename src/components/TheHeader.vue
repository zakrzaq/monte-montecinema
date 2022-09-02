<script setup lang="ts">
import LogoImage from "@/assets/images/logo.svg?component";
import HeaderActions from "@/components/header/HeaderActions.vue";
import HeaderLinks from "@/components/header/HeaderLinks.vue";
import HeaderBanner from "@/components/header/HeaderBanner.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const showActions = computed(() => {
  return route.matched.some((el) => el.path !== "/login");
});
const showBanner = computed(() => {
  return route.matched.some((el) => el.path === "/login");
});
</script>

<template>
  <header class="header">
    <RouterLink :to="{ name: 'HomePage' }" class="logo">
      <LogoImage />
    </RouterLink>
    <HeaderLinks v-if="showActions" />
    <HeaderActions v-if="showActions" />
    <HeaderBanner v-if="showBanner" />
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
