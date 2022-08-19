<script setup lang="ts">
import LogoImage from "@/assets/images/logo.svg?component";
import HeaderActions from "@/components/header/HeaderActions.vue";
import HeaderLinks from "@/components/header/HeaderLinks.vue";
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo">
      <LogoImage />
    </RouterLink>
    <HeaderLinks />
    <HeaderActions />
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
