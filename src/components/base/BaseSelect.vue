<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    options: string[];
    id?: string | number;
    modelValue: string;
    validation?: string;
  }>(),
  {
    options: () => [],
    modelValue: "",
    id: "",
    validation: "",
  }
);

const selectClasses = computed(() => {
  return [
    "base-select__select",
    props.validation ? "base-select__select--error" : "",
  ];
});
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
    <div v-if="props.validation" class="base-select__validations">
      <p>{{ validation }}</p>
    </div>
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
    height: 56px;
    padding: 1em 1.5em;
    border: 0;
    border-radius: 0.5em;
    background-color: $athens-gray;
    margin-bottom: 15px;
    outline: none;

    &::placeholder {
      color: $input-pl-txt;
    }
    &:hover {
      background: $input-bg-hover;
      border-color: $input-bg-hover;
    }
    &:focus {
      background: $input-bg-focus;
      border-color: $input-brd-focus;
      outline: 1px solid $dark-blue;
    }
    &--error {
      background: $athens-gray;
      border-color: $primary-bg;
    }
  }
  &__option {
    background-color: $snow-white;
    color: $tuna;
  }

  &__validations {
    @include roboto(normal, 400);
    font-size: 14px;
    line-height: 170%;
    color: $cherry-red;
  }
}
</style>
