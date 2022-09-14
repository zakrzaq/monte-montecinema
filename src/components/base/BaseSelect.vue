<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    options: { id: number | string; title: string }[];
    id?: string | number;
    modelValue?: string | number;
    errorMessage?: string;
  }>(),
  {
    options: () => [],
    modelValue: "",
    id: "",
    errorMessage: "",
  }
);
const emit = defineEmits<{
  (e: "update:modelValue", id: string | number): void;
  (e: "blur"): void;
}>();

const eventTarget = (event: Event) => {
  const target = (event.target as HTMLInputElement).value;
  return target.length > 1 ? target : parseInt(target);
};

const selectClasses = computed(() => {
  return [
    "base-select__select",
    props.errorMessage ? "base-select__select--error" : "",
  ];
});
const handleEmit = (event: Event) => {
  emit("update:modelValue", eventTarget(event));
};
</script>

<template>
  <div class="base-select">
    <label class="base-select__label" :for="`base-selelect-${id}`"
      ><slot />
      <select
        class="base-select__select"
        :value="modelValue"
        id="id"
        @change="handleEmit"
        @blur="$emit('blur')"
      >
        <option
          v-for="option in options"
          :key="option.id"
          :class="selectClasses"
          :value="option.id"
        >
          {{ option.title }}
        </option>
      </select>
    </label>
    <div v-if="errorMessage" class="base-select__validations">
      <p>{{ errorMessage }}</p>
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
    margin-top: 12px;
    margin-bottom: 5px;
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
