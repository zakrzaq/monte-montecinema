<script setup lang="ts">
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import validateEmail from "@/helpers/validateEmail";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCard from "../components/base/BaseCard.vue";
import touchAll from "@/helpers/touchAll";
import type { LoginCredentials } from "@/types/user";
const userStore = useUserStore();

const loginFormData = ref<LoginCredentials>({
  email: "",
  password: "",
});

const formBlur = ref({
  email: false,
  password: false,
});

const touchForm = () => {
  touchAll(formBlur.value);
};

const emailValid = computed(() => {
  return validateEmail(loginFormData.value.email);
});
const passwordValid = computed(() => {
  return !!loginFormData.value.password;
});

const emailValidation = computed(() => {
  return !emailValid.value && formBlur.value.email
    ? "Please provide a valid email address"
    : "";
});
const passwordValidation = computed(() => {
  return !passwordValid.value && formBlur.value.password
    ? "Please provide a valid password"
    : "";
});

const submitForm = () => {
  touchForm();
  if (!emailValid.value || !passwordValid.value) return;
  userStore.login({
    email: loginFormData.value.email,
    password: loginFormData.value.password,
  });
};
</script>

<template>
  <div class="login">
    <h1 class="login__header heading-1">
      Hi there!<br /><span class="gray">Care to log in?</span>
    </h1>
    <BaseCard class="login__form-wrapper">
      <form
        action=""
        class="login__form"
        novalidate
        @submit.prevent="submitForm"
      >
        <BaseInput
          name="email"
          v-model="loginFormData.email"
          placeholder="Something ending with monterail.com"
          :valid="emailValid"
          :errorMessage="emailValidation"
          @blur="formBlur.email = true"
          >Email</BaseInput
        >
        <BaseInput
          name="password"
          v-model="loginFormData.password"
          placeholder="Enter your password"
          type="password"
          :valid="passwordValid"
          :errorMessage="passwordValidation"
          @blur="formBlur.password = true"
          >Password</BaseInput
        >
        <div class="login__actions">
          <BaseButton size="large" type="secondary"
            >Register instead</BaseButton
          >
          <BaseButton size="large" type="primary" kind="submit"
            >Log in</BaseButton
          >
        </div>
      </form>
    </BaseCard>
    <p class="login__footnote">
      Did you forget your password? <a href="#" class="red">Reset it now</a>
    </p>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  @include flex-vcenter-hcenter;
  flex-direction: column;
  &__header {
    margin-top: 124px;
    width: 600px;
  }
  &__form-wrapper {
    margin-top: 40px;
  }
  &__form {
    :deep(.base-input) {
      margin-bottom: 24px;
    }
    :deep(.base-input__input) {
      margin-top: 12px;
    }
  }
  &__actions {
    margin-top: 40px;
    display: flex;
    .button {
      width: 100%;
      padding: 19px 19px;
    }
  }
  &__footnote {
    margin: 40px 0;
    width: 600px;
    @include roboto(normal, 400);
    font-size: 16px;
    line-height: 170%;
  }
}

.gray {
  color: $jumbo;
}
.red {
  color: $cherry-red;
}
</style>
