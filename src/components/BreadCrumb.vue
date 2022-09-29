<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
import BaseButton from "./base/BaseButton.vue";
import LeftArrow from "@/assets/icons/long-arrow-left.svg?component";
import SeparatorIcon from "@/assets/icons/breadcrumb-arrow.svg?component";

export interface Props {
  backPath?: string;
  firstTier?: string;
  firstTitle?: string;
  secondTitle?: string;
  secondTier?: string;
}

withDefaults(defineProps<Props>(), {
  backPath: "/",
  firstTier: "",
});

const userStore = useUserStore();

const backText = computed(() => {
  return userStore.isEmployee ? "Change desk" : "Back";
});
</script>

<template>
  <div class="breadcrumbs">
    <BaseButton
      variant="breadcrumb"
      modifier="outlined"
      size="slim"
      :to="backPath"
    >
      <LeftArrow />
      <span class="back-text">{{ backText }}</span>
    </BaseButton>
    <BaseButton
      variant="breadcrumb"
      modifier="noborder"
      size="slim"
      :to="firstTier"
    >
      {{ firstTitle }}
    </BaseButton>
    <SeparatorIcon v-if="secondTitle" />
    <BaseButton
      v-if="secondTitle"
      variant="breadcrumb"
      modifier="noborder"
      size="slim"
      :to="secondTier"
    >
      {{ secondTitle }}
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.breadcrumbs {
  margin-bottom: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  gap: 32px;
  width: 100%;
  height: 80px;
  background: $wisp-pink;

  @include sm {
    margin-bottom: 24px;
    justify-content: flex-start;
    height: 40px;
    gap: 12px;
    font-size: 12px;

    .button {
      padding: 5px;
      min-width: 0;
    }

    .button:first-child {
      border: none;

      :nth-child(2) {
        display: none;
      }
    }

    .button:nth-child(3) {
      color: $cherry-red;
    }

    .button:nth-child(4) {
      overflow: hidden;
    }
  }
}
</style>
