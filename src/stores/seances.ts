import { defineStore } from "pinia";
import { getDaySeance } from "@/api/seancesService";
import type { Seance } from "@/types/seance";
const todayDate = new Date();
interface RootState {
  selectedDate: string;
  currentSeances: Seance[] | [];
}
export const useSeancesStore = defineStore({
  id: "seancesStore",
  state: () => {
    return {
      selectedDate: todayDate.toISOString().substring(0, 10),
      currentSeances: [],
    } as RootState;
  },
  getters: {
    seancesByMovie: (state) => {
      return (id: number) =>
        state.currentSeances.filter((seance) => seance.movie === id);
    },
    uniqueMovies(): number[] | [] {
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
