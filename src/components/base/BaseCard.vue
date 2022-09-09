<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    width?: string;
  }>(),
  {
    width: "600px",
  }
);

const cssStyles = computed(() => {
  return `width: ${props.width}`;
});
</script>

<template>
  <div class="base-card" :style="cssStyles"><slot /></div>
</template>

<style scoped lang="scss">
.base-card {
  width: 600px;
  background: $snow-white;
  box-shadow: $card-box-shadow;
  border-radius: 24px;
  padding: 64px;
}
</style>
