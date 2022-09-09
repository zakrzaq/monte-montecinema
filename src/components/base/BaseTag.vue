<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type: "default" | "gray" | "cancelled";
    value?: string;
  }>(),
  {
    type: "default",
    value: "",
  }
);

const valueToStyle = computed(() => {
  if (props.value === "Booked") return "gray";
  if (props.value === "Cancelled") return "cancelled";
  return "default";
});
const tagStyle = computed(() => {
  return [
    "base-tag",
    props.type ? `base-tag--${props.type}` : "",
    props.value ? `base-tag--${valueToStyle.value}` : "",
  ];
});
</script>

<template>
  <div :class="tagStyle">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.base-tag {
  padding: 8px 16px;
  border-radius: 24px;
  @include roboto(normal, 700);
  font-size: 14px;
  line-height: 16px;
  margin: auto;

  &--default {
    background: $wisp-pink;
    color: $bitter-sweet;
  }

  &--gray {
    background: $athens-gray;
    color: $jumbo;
  }

  &--cancelled {
    background: $bitter-sweet;
    color: $wisp-pink;
  }
}
</style>
