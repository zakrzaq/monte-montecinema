<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  buttonType: {
    type: String,
    default: "primary",
  },
  buttonSize: {
    type: String,
    default: "reg",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  return [
    "button",
    { "button--primary": props.buttonType === "primary" },
    { "button--primary-rev": props.buttonType === "primary-rev" },
    { "button--secondary": props.buttonType === "secondary" },
    { "button--tertiary": props.buttonType === "tertiary" },
    { "button--tertiary-rev": props.buttonType === "tertiary-rev" },
    { "button--sml": props.buttonSize === "sml" },
    { "button--reg": props.buttonSize === "reg" },
    { "button--med": props.buttonSize === "med" },
    { "button--lrg": props.buttonSize === "lrg" },
  ];
});

const buttonClick = (event: Event) => {
  emit("click", event);
};
</script>

<template>
  <button :disabled="disabled" :class="buttonClasses" @click="buttonClick">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  @include roboto-mono();
  @include jcc-aic;
  text-decoration: none;
  outline: none;

  &--sml {
    padding: 5px 16px;
    height: 24px;
    font-size: 14px;
    border-radius: 12px;
  }
  &--reg {
    padding: 9px 24px;
    height: 32px;
    font-size: 16px;
    border-radius: 16px;
  }
  &--med {
    padding: 12px 32px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
  }
  &--lrg {
    padding: 19px 40px;
    height: 56px;
    font-size: 18px;
    border-radius: 28px;
  }

  &--primary {
    color: $snow-white;
    border: 2px solid $primary-bg;
    background-color: $primary-bg;
    &:hover {
      background-color: $primary-bg-hover;
      border-color: $primary-bg-hover;
    }
    &:focus {
      background-color: $primary-bg-hover;
      border-color: $primary-brd-focus;
    }
  }

  &--primary-rev {
    color: $primary-bg;
    border: 2px solid $primary-bg;
    background-color: $snow-white;
    &:hover {
      opacity: 50%;
    }
    &:focus {
      border-color: $primary-brd-focus;
    }
  }

  &--secondary {
    color: $primary-bg;
    border: 2px solid $snow-white;
    background-color: $snow-white;
    &:hover {
      background-color: darken($snow-white, 10%);
    }
    &:focus {
      background-color: $snow-white;
      border-color: $primary-brd-focus;
    }
  }

  &--tertiary {
    color: $snow-white;
    border: 2px solid $tertiary-bg;
    background-color: $tertiary-bg;
    &:hover {
      opacity: 75%;
    }
    &:focus {
      border-color: $tertiary-brd-focus;
    }
  }

  &--tertiary-rev {
    color: $tertiary-bg;
    border: 2px solid $tertiary-bg;
    background-color: $snow-white;
    &:hover {
      background-color: darken($snow-white, 10%);
    }
    &:focus {
      border-color: $tertiary-brd-focus;
    }
  }

  &:disabled {
    background-color: $jumbo;
    cursor: not-allowed;
    border: 2px solid $jumbo;
    &:hover {
      opacity: 90%;
    }
  }
}
</style>
