<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    cardWidth?: string;
  }>(),
  {
    cardWidth: "600px",
  }
);
</script>

<template>
  <div
    class="base-card"
    v-bind:style="{ 'max-width': 'unset', width: props.cardWidth }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.base-card {
  width: v-bind(cardWidth);
  background: $snow-white;
  box-shadow: $card-box-shadow;
  border-radius: 24px;
  padding: 64px;
}
</style>
