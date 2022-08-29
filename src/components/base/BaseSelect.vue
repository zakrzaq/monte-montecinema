<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    options: string[];
    id?: string | number;
    modelValue: string;
  }>(),
  {
    options: () => [],
    modelValue: "",
    id: "",
  }
);
</script>

<template>
  <div class="base-select">
    <label class="base-select__label" :for="`base-selelect-${id}`"
      ><slot />
      <select
        class="base-select__select"
        :modelValue="props.modelValue"
        id="id"
        @change="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      >
        <option
          v-for="option in props.options"
          :key="option"
          class="base-select__option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.base-select {
  &__label {
    @include roboto-mono(normal, 700);
    color: $bitter-sweet;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 18px;
    margin: 12px 0;
  }
  &__select {
    display: block;
    width: 100%;
    padding: 1em 1.5em;
    border: 0;
    border-radius: 0.5em;
    background-color: $athens-gray;
    margin-bottom: 15px;
  }
  &__option {
    background-color: $snow-white;
    color: $tuna;
  }
}
</style>
