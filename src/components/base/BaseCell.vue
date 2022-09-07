<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
  }>(),
  {
    label: "Label",
  }
);
</script>

<template>
  <label class="base-cell">
    <div class="base-cell__label">{{ label }}</div>
    <div class="base-cell__content"><slot /></div>
  </label>
</template>

<style scoped lang="scss">
.base-cell {
  min-height: 56px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  &__label {
    @include roboto-mono(normal, 700);
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: $bitter-sweet;
  }

  &__content {
    @include roboto(normal, 400);
    font-size: 16px;
    line-height: 19px;
    color: $charade;
  }
}
</style>
