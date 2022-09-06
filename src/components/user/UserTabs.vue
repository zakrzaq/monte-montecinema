<script setup lang="ts">
import { computed, ref, defineEmits } from "vue";
const emit = defineEmits(["selected"]);

const tabs = ["Personal details", "Reservations"];
const selectedIndex = ref(0);
const selectedTab = computed(() => tabs[selectedIndex.value]);

const handleClick = (index: number) => {
  selectedIndex.value = index;
  emit("selected", selectedTab.value);
};
</script>

<template>
  <div class="user-tabs">
    <ul class="user-tabs__list">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="user-tabs__tab"
        :class="{ 'user-tabs__tab--active': index === selectedIndex }"
        @click="handleClick(index)"
      >
        {{ tab }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.user-tabs {
  margin: 64px 0;

  &__list {
    @include flex-vcenter-hcenter;
    justify-content: flex-start;
    gap: 64px;
  }

  &__tab {
    @include eczar(normal, 600);
    font-size: 48px;
    line-height: 102%;
    letter-spacing: -0.01em;
    color: $bombay;
    cursor: pointer;

    &--active {
      color: $tuna;
    }
  }
}
</style>
