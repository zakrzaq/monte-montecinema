<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "default" | "gray" | "cancelled" | "booking";
    value?: string;
    size?: "medium" | "large";
  }>(),
  {
    type: "default",
    value: "",
    size: "medium",
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
    `base-tag--${props.size}`,
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
  margin: auto;
  @include roboto(normal, 700);
  font-size: 14px;
  line-height: 16px;

  &--medium {
    padding: 8px 16px;
    border-radius: 24px;
  }
  &--large {
    padding: 12px 32px;
    border-radius: 64px;
  }

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
  &--booking {
    @include roboto-mono(normal, 500);
    font-size: 16px;
    color: $cherry-red;
    background-color: $wisp-pink;
  }
}
</style>
