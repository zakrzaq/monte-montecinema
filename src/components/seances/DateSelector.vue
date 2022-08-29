<script setup lang="ts">
import { computed } from "vue";
import BaseButton from "../base/BaseButton.vue";
import { useSeancesStore } from "@/stores/seances";
import { useMovieStore } from "@/stores/movies";
const seancesStore = useSeancesStore();
const movieStore = useMovieStore();

const todayDate = new Date();

const daysList = computed(() => {
  const daysList = [];
  daysList.push({
    id: 1,
    date: todayDate.toISOString().substring(0, 10),
    name: "Today",
  });
  for (let i = 1; i < 6; i++) {
    const date = new Date(todayDate.setDate(todayDate.getDate() + 1));
    daysList.push({
      id: i + 1,
      date: date.toISOString().substring(0, 10),
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return daysList;
});

const updateDate = (date: string) => {
  seancesStore.selectedDate = date;
};
</script>

<template>
  <div class="date-selector">
    <div class="date-selector__tabs">
      <BaseButton
        button-type="breadcrumb"
        button-size="large"
        v-for="day in daysList"
        :key="day.id"
        @click="updateDate(day.date)"
      >
        {{ day.name }}
      </BaseButton>
      <input
        type="date"
        @input="updateDate(($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="date-selector__movies">
      <select
        name=""
        @change="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      >
        <option
          :value="genre"
          v-for="genre in movieStore.genreList"
          :key="genre"
        >
          {{ genre }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-selector {
  display: flex;
  align-items: center;
  gap: 50px;
}
</style>

