<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import NoResults from "@/components/NoResults.vue";
const userStore = useUserStore();

const userData = ref(null);
const editPassword = ref(false);

onMounted(async () => {
  const result = await userStore.getUser();
  userData.value = await result;
});
</script>

<template>
  <div v-if="userData" class="user-page">
    <BaseCard>
      <form>
        <BaseInput v-model="userData.email">Email</BaseInput>
        <BaseButton
          v-if="!editPassword"
          type="secondary"
          modifier="outlined"
          @click="editPassword = true"
        >
          Change password
        </BaseButton>
        <BaseInput v-else v-model="userData.password" type="password">
          Password
        </BaseInput>
        <BaseInput v-model="userData.first_name">First Name</BaseInput>
        <BaseInput v-model="userData.last_name">Last Name</BaseInput>
        <BaseInput v-model="userData.date_of_birth">
          Date of birth
          <template #message>You should be minium 18 years old</template>
        </BaseInput>
      </form>
    </BaseCard>
  </div>
  <NoResults v-else> No user was found...</NoResults>
</template>

<style scoped></style>
