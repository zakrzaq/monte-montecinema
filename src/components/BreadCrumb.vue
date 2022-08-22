<script setup lang="ts">
import BaseButton from "./base/BaseButton.vue";
import LeftArrow from "@/assets/icons/long-arrow-left.svg?component";
import SeparatorIcon from "@/assets/icons/breadcrumb-arrow.svg?component";

export interface Props {
  backPath?: string;
  firstTier?: string;
  secondTitle?: string;
  secondTier?: string;
}

withDefaults(defineProps<Props>(), {
  backPath: "/",
  firstTier: "",
});
</script>

<template>
  <div class="breadcrumbs">
    <BaseButton button-type="breadcrumb" button-size="slim" :to="backPath">
      <LeftArrow />
      Back
    </BaseButton>
    <BaseButton button-type="breadcrumb-rev" button-size="slim" :to="firstTier">
      Movies
    </BaseButton>
    <SeparatorIcon v-if="secondTitle" />
    <BaseButton
      v-if="secondTitle"
      button-type="breadcrumb-rev"
      button-size="slim"
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
}
</style>
