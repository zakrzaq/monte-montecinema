<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const router = useRouter();
const userStore = useUserStore();

const desks = ref([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

const handleClick = (event: Event) => {
  const deskNumber = (event.target as HTMLInputElement).value;
  if (deskNumber) {
    userStore.deskNumber = deskNumber;
    router.push({ name: "DoWorkPage" });
  }
};
</script>

<template>
  <div class="terminals">
    <h1 class="terminals__heading">Choose your ticket desk</h1>
    <div class="terminals__box">
      <button
        v-for="desk in desks"
        :key="desk.id"
        :value="desk.id"
        class="terminals__desk"
        @click="handleClick"
      >
        <p class="terminals__no">{{ desk.id }}</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.terminals {
  width: 100%;

  &__heading {
    margin-top: 64px;
    @include eczar(normal, 600);
    font-size: 48px;
  }

  &__box {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    margin: 64px 0;
  }

  &__desk {
    @include flex-vcenter-hcenter;
    padding: 8px;
    gap: 10px;
    width: 288px;
    height: 170px;
    background: $cosmos;
    border: none;
    transition: 0.2s ease-in;

    &:hover {
      background-color: $cherry-red;
      & p {
        color: $snow-white;
      }
    }
  }
  &__no {
    @include roboto-mono(normal, 500);
    font-size: 85px;
    color: $tuna;
    transition: 0.2s ease-in;
  }
}
</style>
