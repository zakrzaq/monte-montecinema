<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import BaseButton from "../base/BaseButton.vue";
import BaseSelect from "../base/BaseSelect.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import CalendarIcon from "@/assets/icons/calendar.svg?component";
import { useSeancesStore } from "@/stores/seances";
import { useMovieStore } from "@/stores/movies";
import type { DaysList } from "@/types/days-list";
const seancesStore = useSeancesStore();
const movieStore = useMovieStore();
const route = useRoute();
const { selectedDate } = storeToRefs(seancesStore);
defineEmits(["update:modelValue"]);

const todayDate = new Date();
const selectOptions = computed(() => {
  const all = ["All movies", ...movieStore.titleList];
  return all.map((item) => {
    return { id: item, title: item };
  });
});

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

const showMoviesDropdown = computed(() => {
  if (route.path === "/") return "";
  if (route.path === "/screenings") return "";
  return "hidden";
});
</script>

<template>
  <div class="date-selector">
    <label class="date-selector__label">Days</label>
    <label class="date-selector__label" :class="showMoviesDropdown"
      >Movies</label
    >
    <div class="date-selector__buttons">
      <BaseButton
        type="breadcrumb"
        :modifier="day.date === seancesStore.selectedDate ? '' : 'outlined'"
        size="large"
        v-for="day in daysList"
        :key="day.id"
        @click="updateDate(day.date)"
      >
        {{ day.name }}
      </BaseButton>
      <BaseButton
        class="date-selector__date-picker"
        type="breadcrumb"
        modifier="outlined"
        size="large"
      >
        <Datepicker
          v-model="selectedDate"
          :auto-apply="true"
          :close-on-auto-apply="true"
        >
          <template #input-icon>
            <CalendarIcon />
          </template>
        </Datepicker>
      </BaseButton>
    </div>
    <div class="date-selector__movies" :class="showMoviesDropdown">
      <BaseSelect
        name=""
        :options="selectOptions"
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

    :deep(.base-select__select) {
      min-height: 56px;
      margin-bottom: 0;
    }
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

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
  }

  &__actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }

  &__date-picker {
    position: relative;
    padding: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    min-width: unset;

    :deep(.dp__main, .dp__theme_light) {
      width: 100%;
      height: 100%;
    }

    :deep(.dp__pointer, .dp__input_readonly, .dp__input, dp__input_icon_pad, .dp__input_reg) {
      border: none;
      display: none;
    }
    :deep(.dp__icon, .dp__clear_icon) {
      display: none;
    }

    :deep(.dp__input_icon) {
      top: 27px;
      right: -1px;
    }
  }
}

.hidden {
  visibility: hidden;
}
</style>
