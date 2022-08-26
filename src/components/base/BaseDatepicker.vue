<script setup lang="ts">

withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);
</script>

<template>
  <div class="date-picker">
    <label for="" class="date-picker__label">
      <slot />
      <CalendarIcon class="date-picker__calendar" />
      <input type="date" class="date-picker__input" @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      " />
    </label>
  </div>
</template>


<style scoped lang="scss">
.datepicker {
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