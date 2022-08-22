<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    inputType?: string;
    inputName?: string;
    placeholder?: string;
  }>(),
  {
    modelValue: "",
    inputValue: "text",
    inputName: "",
    placeholder: "...",
  }
);
</script>

<template>
  <div class="base-input">
    <label :for="props.inputName" class="base-input__label"><slot /></label>
    <input
      :id="props.inputName"
      class="base-input__input"
      required
      :type="props.inputType"
      :placeholder="props.placeholder"
      :modelValue="props.modelValue"
      :name="props.inputType"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  position: relative;
  &__input {
    display: block;
    width: 100%;
    padding: 1em 1.5em;
    border: 0;
    border-radius: 0.5em;
    background-color: $athens-gray;
    margin-bottom: 15px;
  }
  &__label {
    color: $bitter-sweet;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    margin: 12px 0;
  }
}
</style>
