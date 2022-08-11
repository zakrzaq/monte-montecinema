<template>
  <button :disabled="disabled" :class="buttonClasses" @click="click">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainButton",
  props: {
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
  },
  computed: {
    buttonClasses() {
      return [
        "button",
        { "button--primary": this.buttonType === "primary" },
        { "button--primary-rev": this.buttonType === "primary-rev" },
        { "button--secondary": this.buttonType === "secondary" },
        { "button--tertiary": this.buttonType === "tertiary" },
        { "button--tertiary-rev": this.buttonType === "tertiary-rev" },
        { "button--sml": this.buttonSize === "sml" },
        { "button--reg": this.buttonSize === "reg" },
        { "button--med": this.buttonSize === "med" },
        { "button--lrg": this.buttonSize === "lrg" },
      ];
    },
  },
  methods: {
    click(event: Event) {
      this.$emit("click", event);
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  font-family: "Roboto Mono", monospace;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
    border: 2px solid $cherry-red;
    background-color: $cherry-red;
    &:hover {
      background-color: $totem-pole;
      border: 2px solid $totem-pole;
    }
    &:focus {
      background-color: $totem-pole;
      border: 2px solid $bittersweet;
    }
  }

  &--primary-rev {
    color: $cherry-red;
    border: 2px solid $cherry-red;
    background-color: $snow-white;
    &:hover {
      opacity: 50%;
    }
    &:focus {
      border: 2px solid $bittersweet;
    }
  }

  &--secondary {
    color: $cherry-red;
    border: 2px solid $snow-white;
    background-color: $snow-white;
    &:hover {
      background-color: darken($snow-white, 10%);
    }
    &:focus {
      background-color: $snow-white;
      border: 2px solid $bittersweet;
    }
  }

  &--tertiary {
    color: $snow-white;
    border: 2px solid $tuna;
    background-color: $tuna;
    &:hover {
      background-color: lighten($tuna, 10%);
      border-color: lighten($tuna, 10%);
    }
    &:focus {
      border-color: lighten($tuna, 50%);
    }
  }

  &--tertiary-rev {
    color: $tuna;
    border: 2px solid $tuna;
    background-color: $snow-white;
    &:hover {
      background-color: darken($snow-white, 10%);
    }
    &:focus {
      border-color: lighten($tuna, 50%);
    }
  }

  &:disabled {
    background-color: $jumbo;
    cursor: not-allowed;
    border: 1;
    &:hover {
      opacity: 90%;
    }
  }
}
</style>
