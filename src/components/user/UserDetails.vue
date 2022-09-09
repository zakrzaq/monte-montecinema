<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { validateEmail, validateDateOfBirth } from "@/helpers/validate";
import { touchAll } from "@/helpers/touchAll";
import { patchUser } from "@/api/userService";
import { useUserStore } from "@/stores/user";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import NoResults from "@/components/NoResults.vue";
import type { PatchCredentials } from "@/types/user";
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const editPassword = ref(false);
const current_password = ref("");
const new_password = ref("");

const formBlur = ref({
  email: false,
  current_password: false,
  new_password: false,
  first_name: false,
  last_name: false,
  date_of_birth: false,
  privacy_policy: false,
});

const touchForm = () => touchAll(formBlur.value);

const emailValid = computed(() => {
  return validateEmail(user.value.email);
});
const firstNameValid = computed(() => {
  return !!user.value.first_name;
});
const lastNameValid = computed(() => {
  return !!user.value.last_name;
});
const dateOfBirthValid = computed(() => {
  return validateDateOfBirth(user.value.date_of_birth);
});
const passwordNewValid = computed(() => {
  if (editPassword.value) {
    return (
      new_password.value.length > 7 &&
      /[a-zA-Z]/.test(new_password.value) &&
      /\d/.test(new_password.value)
    );
  } else {
    return true;
  }
});
const passwordCurrentValid = computed(() => {
  return editPassword.value ? !!current_password.value : true;
});
const formValid = computed(() => {
  return (
    emailValid.value &&
    firstNameValid.value &&
    lastNameValid.value &&
    dateOfBirthValid.value &&
    passwordNewValid.value &&
    passwordCurrentValid.value
  );
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
const passwordNewValidation = computed(() => {
  return !passwordNewValid.value && formBlur.value.new_password
    ? "Please provide password wit at least one letter, one digit and minimum of 8 characters."
    : "";
});
const passwordCurrentValidation = computed(() => {
  return !passwordCurrentValid.value && formBlur.value.current_password
    ? "This field is required"
    : "";
});

const submitForm = async () => {
  touchForm();
  if (!formValid.value) return;
  try {
    const formData: PatchCredentials = {
      email: user.value.email,
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      date_of_birth: user.value.date_of_birth,
      password: new_password.value,
      current_password: current_password.value,
    };
    console.log(formData);
    await patchUser(formData);
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div v-if="user" class="user-page">
    <BaseCard width="100%">
      <form class="user-page__form" novalidate @submit.prevent="submitForm">
        <BaseInput
          name="email_"
          v-model="user.email"
          placeholder="Something ending with monterail.com"
          :errorMessage="emailValidation"
          @blur="formBlur.email = true"
          >Email</BaseInput
        >
        <BaseButton
          v-if="!editPassword"
          type="secondary"
          modifier="outlined"
          @click="editPassword = true"
        >
          Change password
        </BaseButton>
        <template v-else>
          <BaseInput
            name="new_password"
            v-model="new_password"
            type="password"
            :error-message="passwordNewValidation"
            @blur="formBlur.new_password = true"
          >
            New Password
          </BaseInput>
          <BaseInput
            name="current_password"
            v-model="current_password"
            type="password"
            :error-message="passwordCurrentValidation"
            @blur="formBlur.current_password = true"
          >
            Current Password
          </BaseInput>
        </template>
        <BaseInput
          name="first_name_"
          v-model="user.first_name"
          :error-message="firstNameValidation"
          @blur="formBlur.first_name = true"
          >First Name</BaseInput
        >

        <BaseInput
          name="last_name_"
          v-model="user.last_name"
          :error-message="lastNameValidation"
          @blur="formBlur.last_name = true"
          >Last Name</BaseInput
        >
        <BaseInput
          name="date_of_birth_"
          v-model="user.date_of_birth"
          :error-message="dateOfBirthValidation"
          @blur="formBlur.date_of_birth = true"
        >
          Date of birth
          <template #message>You should be minium 18 years old</template>
        </BaseInput>
        <div class="user-page__controls">
          <BaseButton type="secondary" modifier="outlined">
            Save changes
          </BaseButton>
        </div>
      </form>
    </BaseCard>
  </div>
  <NoResults v-else> No user was found...</NoResults>
</template>

<style scoped lang="scss">
.user-page {
  width: 100%;
  margin-bottom: 60px;

  :deep(.base-input),
  :deep(.button) {
    margin-bottom: 24px;
  }

  :deep(.base-card) {
    width: 100%;
  }

  &__form {
    width: 472px;
  }

  &__controls {
    :deep(.button) {
      width: 100%;
      padding: 19px 25px;
      margin-bottom: 0;
    }
  }
}
</style>
