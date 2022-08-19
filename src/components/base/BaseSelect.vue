<script setup lang="ts">
interface Props {
  options: string[];
  modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {
  options: null,
  modelValue: "",
});
</script>

<template>
  <div class="base-dropdown">
    <label class="case-dropdown-__label" for=""><slot /></label>
    <select
      class="base-dropdown__select"
      :modelValue="props.modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    >
      <option
        v-for="option in props.options"
        :key="option"
        class="base-dropdown__option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.base-dropdown {
  &__label {
    font-family: Roboto, Mono;
    color: $bitter-sweet;
    text-transform: uppercase;
    font-weight: 700;
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
