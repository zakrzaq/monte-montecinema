<script setup lang="ts">
import LogoImage from "@/assets/images/logo.svg?component";
import Hamburger from "@/assets/icons/hamburger.svg?component";
import HeaderActions from "@/components/header/HeaderActions.vue";
import HeaderLinks from "@/components/header/HeaderLinks.vue";
</script>

<template>
  <header class="header">
    <RouterLink to="/">
      <LogoImage />
    </RouterLink>
    <HeaderLinks />
    <HeaderActions />
    <RouterLink to="#">
    <Hamburger class="hamburger" />
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
.header {
  @include jcc-aic;
  justify-content: space-between;
  height: 112px;
  & .hamburger {
    @include lg {
      display: none;
    }
    @include md {
      display: none;
    }
  }
}
</style>
