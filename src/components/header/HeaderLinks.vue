<script setup lang="ts">
interface Link {
  id: number;
  title: string;
  url: string;
}

const links: Link[] = [
  { id: 1, title: "Movies", url: "#" },
  { id: 2, title: "Screenings", url: "#" },
  { id: 3, title: "Contact Us", url: "#" },
];

// TO BE CONNECTED TO router.path WHEN WE HAVE THOSE PAGES
const navbarItemClass = (link: Link) => {
  return [
    "navbar__item",
    { "navbar__item--active": link.title === "Screenings" },
  ];
};
</script>

<template>
  <ul class="navbar">
    <li v-for="link in links" :key="link.id" :class="navbarItemClass(link)">
      <RouterLink to="link.url">{{ link.title }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.navbar {
  @include jcc-aic;
  height: 100%;

  &__item {
    width: 140px;
    height: 100%;
    @include jcc-aic;
    @include roboto(normal, 400);
    font-size: 18px;
    line-height: 21px;
    color: $jumbo;
    &:hover {
      @include roboto(normal, 700);
      font-size: 18px;
      line-height: 21px;
      color: #484954;
    }
    &--active {
      @include roboto(normal, 700);
      font-size: 18px;
      line-height: 21px;
      color: #484954;
      border-bottom: 5px solid $cherry-red;
    }
  }
}
</style>
