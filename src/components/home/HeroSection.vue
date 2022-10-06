<script setup lang="ts">
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/base/BaseButton.vue";
</script>

<template>
  <div class="hero">
    <div class="hero__content">
      <h1 class="heading-1">{{ $t("heroSection.title") }}</h1>
      <p class="paragraph">{{ $t("heroSection.long") }}</p>
      <BaseButton to="#" size="large">{{
        $t("heroSection.button")
      }}</BaseButton>
    </div>
    <div class="hero__image">
      <img
        src="@/assets/images/welcome.jpg"
        alt="Image of theatre room full of people"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  width: 100%;
  display: grid;
  grid-template: 1fr / 2fr 1fr;

  @include sm {
    grid-template: 1fr / 1fr;
  }

  @include md {
    grid-template: 1fr / 1fr;
  }

  &__content {
    padding: 80px;
    gap: 40px;
    background: $wisp-pink;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include sm {
      padding: 32px;
    }

    & .heading-1 {
      @include sm {
        font-size: 48px;
        text-align: center;
      }
    }

    & .paragraph {
      @include sm {
        text-align: center;
      }
    }

    & .button {
      align-self: flex-start;

      @include sm {
        align-self: stretch;
      }
    }
  }

  &__image {
    @include md {
      display: none;
    }

    @include sm {
      display: none;
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
