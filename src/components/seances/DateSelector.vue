<script setup lang="ts">
import { computed } from "vue";
import BaseButton from "../base/BaseButton.vue";
import BaseSelect from "../base/BaseSelect.vue";
import { useSeancesStore } from "@/stores/seances";
import { useMovieStore } from "@/stores/movies";
import type { DaysList } from "@/types/days-list";
const seancesStore = useSeancesStore();
const movieStore = useMovieStore();

const todayDate = new Date();

const daysList = computed(() => {
  const daysList = [];
  daysList.push({
    id: 1,
    date: todayDate.toISOString().substring(0, 10),
    name: "Today",
  } as DaysList);
  for (let i = 1; i < 6; i++) {
    const date = new Date(todayDate.setDate(todayDate.getDate() + 1));
    daysList.push({
      id: i + 1,
      date: date.toISOString().substring(0, 10),
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
    } as DaysList);
  }
  return daysList;
});

const updateDate = (date: string) => {
  seancesStore.selectedDate = date;
};
</script>

<template>
  <div class="date-selector">
    <label class="date-selector__label">Days</label>
    <label class="date-selector__label">Movies</label>
    <div>
      <BaseButton
        button-type="breadcrumb"
        :button-style="day.date === seancesStore.selectedDate ? '' : 'outlined'"
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
      <BaseSelect
        name=""
        :options="movieStore.genreList"
        @change="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-selector {
  margin-bottom: 64px;
  width: 100%;
  display: grid;
  grid-template: 1fr / 1fr 250px;

  &__tabs {
    display: flex;
    flex-direction: column;
  }

  &__movies {
    min-width: 250px;
  }

  &__label {
    display: inline-block;
    color: $bitter-sweet;
    text-transform: uppercase;
    font-weight: bold;
    padding: 0;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 12px;
  }

  &__actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
}
</style>
