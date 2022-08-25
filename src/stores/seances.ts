import { defineStore } from "pinia";
import { getDaySeance } from "@/api/seancesService";
import type { Seance } from "@/types/seance";

interface RootState {
  selectedDay: Date;
  currentSeances: Seance[] | [];
}
export const useSeancesStore = defineStore({
  id: "seancesStore",
  state: () => {
    return {
      selectedDay: new Date(),
      currentSeances: [],
    } as RootState;
  },
  getters: {
    selectedDate(): string {
      return this.selectedDay.toISOString().substring(0, 10);
    },
    seancesByMovie: (state) => {
      return (id: number) =>
        state.currentSeances.filter((seance) => seance.movie === id);
    },
    currentMovies(): number[] | [] {
      if (this.currentSeances)
        return [
          ...new Set(this.currentSeances.map((seance: Seance) => seance.movie)),
        ];
      return [];
    },
  },
  actions: {
    async getCurrentSeances() {
      try {
        const data = await getDaySeance(this.selectedDate);
        this.currentSeances = data;
      } catch (err) {
        console.log(err);
        this.currentSeances = [];
      }
    },
  },
});
