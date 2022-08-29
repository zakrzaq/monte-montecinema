<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    buttonKind?: "button" | "submit";
    buttonType?:
      | "primary"
      | "primary-rev"
      | "secondary"
      | "tertiary"
      | "tertiary-rev"
      | "breadcrumb"
      | "breadcrumb-rev";
    buttonSize?: "small" | "regular" | "medium" | "large" | "slim";
    to?:
      | string
      | {
          name: string;
          params: {
            id: string | number;
          };
        };
  }>(),
  {
    buttonKind: "button",
    buttonType: "primary",
    buttonSize: "regular",
    to: "",
  }
);

const buttonClasses = computed(() => {
  return [
    "button",
    `button--${props.buttonType}`,
    `button--${props.buttonSize}`,
  ];
});
</script>

<template>
  <template v-if="!props.to">
    <button :class="buttonClasses" @click="$emit('click', $event)">
      <slot />
    </button>
  </template>
  <template v-else>
    <RouterLink :to="props.to" :class="buttonClasses">
      <slot />
    </RouterLink>
  </template>
</template>

<style lang="scss" scoped>
.button {
  @include roboto-mono();
  @include flex-vcenter-hcenter;
  text-decoration: none;
  outline: none;
  min-width: 115px;

  &--small {
    padding: 5px 16px;
    height: 24px;
    font-size: 14px;
    border-radius: 12px;
  }

  &--regular {
    padding: 9px 24px;
    height: 32px;
    font-size: 16px;
    border-radius: 16px;
  }

  &--medium {
    padding: 12px 32px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
  }

  &--large {
    padding: 19px 40px;
    height: 56px;
    font-size: 18px;
    border-radius: 28px;
  }

  &--slim {
    padding: 12px 32px;
    gap: 12px;
    border: 2px solid $tuna;
    border-radius: 64px;
  }

  &--breadcrumb {
    color: $tuna;
    background-color: transparent;

    &-rev {
      border-color: transparent;
      background-color: transparent;
    }
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
