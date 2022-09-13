<script setup lang="ts">
const emit = defineEmits<{
  (e: "update:modelValue", id: boolean): void;
  (e: "blur"): void;
}>();
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    errorMessage?: string;
  }>(),
  {
    modelValue: false,
    errorMessage: "",
  }
);

const handleInput = () => {
  emit("update:modelValue", !props.modelValue);
  emit("blur");
};
</script>

<template>
  <label class="base-checkbox flex aic">
    <input
      :checked="modelValue"
      :value="modelValue"
      type="checkbox"
      class="base-checkbox__input"
      @input="handleInput"
    />
    <slot />
  </label>
  <div v-if="errorMessage" class="base-checkbox__validations">
    <p>{{ errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
.base-checkbox {
  cursor: pointer;
  @include flex-vcenter-hcenter;
  justify-content: flex-start;
  @include roboto(normal, 400);
  font-size: 18px;
  line-height: 27px;

  &__input {
    position: relative;
    appearance: none;
    background-color: #fff;
    width: 24px;
    height: 24px;
    border: 0.75px solid #aeaeb3;
    border-radius: 8px;
    margin: 0 8px 0 0;
    cursor: pointer;

    &::before {
      position: absolute;
      opacity: 0;
      width: 24px;
      height: 24px;
      border-radius: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      background: #f47073;
      background: url("@/assets/icons/checkbox-ticked.svg");
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      transition: opacity 0.2s;
    }

    &:checked {
      &::before {
        opacity: 1;
      }
    }
  }
  &__validations {
    @include roboto(normal, 400);
    font-size: 14px;
    line-height: 170%;
    color: $cherry-red;
    margin-top: 8px;
  }
}
</style>
