<script setup lang="ts">
import { ref, computed } from "vue";
import EyeIcon from "@/assets/icons/eye.svg?component";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    errorMessage?: string;
    disabled?: boolean;
  }>(),
  {
    modelValue: "",
    inputValue: "text",
    name: "",
    placeholder: "...",
    errorMessage: "",
    disabled: false,
  }
);
defineEmits<{
  (e: "update:modelValue", id: string): void;
  (e: "blur"): void;
}>();

const passwordVisible = ref(false);

const toggleViewPassword = () => {
  passwordVisible.value = !passwordVisible.value;
};

const inputClasses = computed(() => {
  return [
    "base-input__input",
    props.errorMessage ? "base-input__input--error" : "",
    props.disabled ? "base-input__input--disabled" : "",
  ];
});
</script>

<template>
  <div class="base-input">
    <label :for="name" class="base-input__label"
      ><slot />
      <input
        :id="name"
        :disabled="disabled"
        :class="inputClasses"
        required
        :type="passwordVisible ? 'text' : type"
        :value="modelValue"
        :placeholder="placeholder"
        :name="type"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @blur="$emit('blur')"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="base-input__button"
        @click="toggleViewPassword"
      >
        <EyeIcon />
      </button>
    </label>
    <div class="base-input__message"><slot name="message"></slot></div>
    <div v-if="errorMessage" class="base-input__validations">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  position: relative;
  &__input {
    display: block;
    position: relative;
    width: 100%;
    height: 56px;
    padding: 1em 1.5em;
    border: 0;
    border-radius: 0.5em;
    background-color: $athens-gray;
    margin-top: 12px;
    margin-bottom: 5px;
    outline: none;

    &--error {
      background: $athens-gray;
      border: 1px solid $cherry-red;
      color: $cherry-red;
    }

    &--disabled {
      background: $wisp-pink;
      border: 1px solid $wisp-pink;
    }

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
  }
  &__label {
    position: relative;
    display: block;
    color: $bitter-sweet;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    margin: 12px 0;
  }
  &__button {
    width: 56px;
    height: 56px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    bottom: 0px;
    right: 0px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__message {
    margin-top: 8px;
  }

  &__validations {
    @include roboto(normal, 400);
    font-size: 14px;
    line-height: 170%;
    color: $cherry-red;
  }
}
</style>
