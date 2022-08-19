<script setup lang="ts">
import BaseButton from "./base/BaseButton.vue";
import LeftArrow from "@/assets/icons/long-arrow-left.svg?component";

export interface Props {
  backPath: string;
  firstTier: string;
}

const props = withDefaults(defineProps<Props>(), {
  backPath: "/",
  firstTier: "",
});
</script>

<template>
  <div class="breadcrumbs">
    <BaseButton
      button-type="breadcrumb"
      button-size="slim"
      :to="props.backPath"
    >
      <LeftArrow />
      Back
    </BaseButton>
    <BaseButton
      button-type="breadcrumb-rev"
      button-size="slim"
      :to="props.firstTier"
    >
      Movies
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
