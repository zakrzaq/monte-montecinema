<script setup lang="ts"></script>

<template>
  <ul class="navbar">
    <li class="navbar__item">
      <RouterLink :to="{ name: 'MoviesPage' }">{{
        $t("header.links.one")
      }}</RouterLink>
    </li>
    <li class="navbar__item">
      <RouterLink :to="{ name: 'ScreeningsPage' }">{{
        $t("header.links.two")
      }}</RouterLink>
    </li>
    <li class="navbar__item">
      <RouterLink :to="{ name: 'ContactPage' }">{{
        $t("header.links.three")
      }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.navbar {
  @include flex-vcenter-hcenter;
  height: 100%;

  @include md {
    display: none;
  }

  @include sm {
    display: none;
  }

  &__item {
    width: 140px;
    height: 100%;
    @include flex-vcenter-hcenter;
    @include roboto(normal, 400);
    font-size: 18px;
    color: $jumbo;

    a {
      border-bottom: 5px solid $snow-white;
    }

    &:hover {
      @include roboto(normal, 700);
      font-size: 18px;
      color: #484954;
    }

    .router-link-active {
      @include roboto(normal, 700);
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #484954;
      border-bottom: 5px solid $cherry-red;
    }
  }
}
</style>
