<script setup lang="ts">
import { computed, ref, type ComputedRef } from "vue";
import { useUserStore } from "@/stores/user";
import { validateEmail, validateDateOfBirth } from "@/helpers/validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import BaseCard from "../components/base/BaseCard.vue";
import type { RegisterCredentials } from "@/types/user";
import router from "@/router";
const userStore = useUserStore();

const steps = ref(1);
const title = computed(() => {
  return steps.value === 1 ? "Ahoy you!" : "Great!";
});
const subtitle = computed(() => {
  return steps.value === 1 ? "Care to register?" : "Now your name";
});

const formData = ref<RegisterCredentials>({
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
});
const privacy_policy = ref(false);

const formBlur = ref({
  email: false,
  password: false,
  first_name: false,
  last_name: false,
  date_of_birth: false,
  privacy_policy: false,
});

const emailValid = computed(() => {
  return validateEmail(formData.value.email);
});
const passwordValidLength = computed(() => {
  return formData.value.password.length > 7;
});
const passwordValidLetters = computed(() => {
  return /[a-zA-Z]/.test(formData.value.password);
});
const passwordValidDigits = computed(() => {
  return /\d/.test(formData.value.password);
});
const passwordValid = computed(() => {
  return (
    passwordValidLength.value &&
    passwordValidLetters.value &&
    passwordValidDigits.value
  );
});
const firstNameValid = computed(() => {
  return !!formData.value.first_name;
});
const lastNameValid = computed(() => {
  return !!formData.value.last_name;
});
const dateOfBirthValid = computed(() => {
  return validateDateOfBirth(formData.value.date_of_birth);
});

const emailValidation = computed(() => {
  return !emailValid.value && formBlur.value.email
    ? "Please provide a valid email address"
    : "";
});
const firstNameValidation = computed(() => {
  return !firstNameValid.value && formBlur.value.first_name
    ? "Please provide a valid first name"
    : "";
});
const lastNameValidation = computed(() => {
  return !lastNameValid.value && formBlur.value.last_name
    ? "Please provide a valid last name"
    : "";
});
const dateOfBirthValidation = computed(() => {
  return !dateOfBirthValid.value && formBlur.value.date_of_birth
    ? "Please provide a valid date of birth"
    : "";
});
const privacyPolicyValidation = computed(() => {
  return !privacy_policy.value && formBlur.value.privacy_policy
    ? "Please provide a valid date of birth"
    : "";
});

const getWarningMessageClass = (validator: ComputedRef<string> | boolean) => {
  if (formBlur.value.password)
    return [
      "register__warning",
      validator ? "register__warning--green" : "register__warning--red",
    ];
};

const submitForm = async () => {
  if (steps.value === 1) {
    formBlur.value.email = true;
    formBlur.value.password = true;
    if (!emailValid.value || !passwordValid.value) return;
    steps.value += steps.value;
  } else {
    formBlur.value.first_name = true;
    formBlur.value.last_name = true;
    formBlur.value.date_of_birth = true;
    formBlur.value.privacy_policy = true;
    if (
      !firstNameValid.value ||
      !lastNameValid.value ||
      !dateOfBirthValid.value ||
      !privacy_policy.value
    )
      return;
    try {
      await userStore.register(formData.value);
      router.push({ name: "UserPage" });
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<template>
  <div class="register">
    <h1 class="register__header heading-1">
      {{ title }}<br /><span class="gray">{{ subtitle }}</span>
    </h1>
    <BaseCard class="register__form-wrapper">
      <form
        action=""
        class="register__form"
        novalidate
        @submit.prevent="submitForm"
      >
        <template v-if="steps === 1">
          <BaseInput
            name="email"
            v-model="formData.email"
            placeholder="Something ending with monterail.com"
            :errorMessage="emailValidation"
            @blur="formBlur.email = true"
            >Email</BaseInput
          >
          <BaseInput
            name="password"
            v-model="formData.password"
            placeholder="Enter your password"
            type="password"
            @blur="formBlur.password = true"
            >Password
            <template #message>
              <p :class="getWarningMessageClass(passwordValidLength)">
                At least 8 characters
              </p>
              <p :class="getWarningMessageClass(passwordValidLetters)">
                At least one letter
              </p>
              <p :class="getWarningMessageClass(passwordValidDigits)">
                At least one digit
              </p>
            </template></BaseInput
          >
        </template>
        <template v-if="steps === 2">
          <BaseInput
            name="first_name"
            v-model="formData.first_name"
            placeholder="e.g. Jessica"
            :errorMessage="firstNameValidation"
            @blur="formBlur.first_name = true"
            >First name
          </BaseInput>
          <BaseInput
            name="last_name"
            v-model="formData.last_name"
            placeholder="e.g. Walton"
            :errorMessage="lastNameValidation"
            @blur="formBlur.last_name = true"
            >Last name</BaseInput
          >
          <BaseInput
            name="date_of_brith"
            v-model="formData.date_of_birth"
            type="date"
            placeholder="DD / MM / YYYY"
            :errorMessage="dateOfBirthValidation"
            @blur="formBlur.date_of_birth = true"
            >Date of birth
            <template #message
              >You should be minium 18 years old</template
            ></BaseInput
          >
          <BaseCheckbox
            v-model="privacy_policy"
            @blur="formBlur.privacy_policy = true"
            :errorMessage="privacyPolicyValidation"
          >
            I accept
            <a href="#" class="register__privacy-policy">Privacy Policy</a>
          </BaseCheckbox>
        </template>
        <div class="register__actions">
          <BaseButton size="large" type="secondary" :to="{ name: 'LoginPage' }"
            >Log in instead</BaseButton
          >
          <BaseButton size="large" type="primary" kind="submit">
            {{ steps === 1 ? "Next Step" : "Register" }}</BaseButton
          >
        </div>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped lang="scss">
.register {
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
  &__warning {
    @include roboto(normal, 400);
    font-size: 14px;
    line-height: 170%;
    color: $tuna;
    &--red {
      color: $cherry-red;
    }
    &--green {
      color: green;
    }
  }
  &__privacy-policy {
    margin-left: 5px;
  }
}

.gray {
  color: $jumbo;
}
.red {
  color: $cherry-red;
}
</style>
