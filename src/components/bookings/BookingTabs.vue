<script setup lang="ts">
import { computed, ref } from "vue";
import { useBookingStore } from "@/stores/booking";
import No1Circle from "@/assets/icons/circle-no1.svg?component";
import No2Circle from "@/assets/icons/circle-no2.svg?component";

const bookingStore = useBookingStore();

const emit = defineEmits<{
  (e: "selected", id: string): void;
}>();

const tabs = ["Choose seats", "Book tickets"];
const selectedIndex = ref(0);
const selectedTab = computed(() => {
  return tabs[selectedIndex.value];
});

const handleClick = (index: number) => {
  if (bookingStore.selectedTickets.length > 0) {
    selectedIndex.value = index;
    emit("selected", selectedTab.value);
  }
};
</script>

<template>
  <div class="booking-tabs">
    <ul class="booking-tabs__list">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="booking-tabs__tab"
        :class="
          tab === tabs[0]
            ? 'booking-tabs__tab--pink'
            : 'booking-tabs__tab--black'
        "
        @click="handleClick(index)"
      >
        <button class="booking-tabs__button">
          <No1Circle v-if="tab === tabs[0]" />
          <No2Circle v-else />
          {{ tab }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.booking-tabs {
  height: 56px;
  width: 100%;
  @include flex-vcenter-hcenter;
  background-color: $wisp-pink;

  &__list {
    @include flex-vcenter-hcenter;
    justify-content: flex-start;
    gap: 64px;
  }
  &__button {
    padding: 12px 24px;
    width: 186px;
    @include flex-vcenter-hcenter;
    gap: 12px;
    background-color: transparent;
    border-radius: 26px;
    border: 2px solid transparent;

    &--black {
      border-color: $tuna;
      color: $tuna;
    }
    &--pink {
      border-color: $sweet-pink;
      color: $sweet-pink;
    }
  }
}
</style>
