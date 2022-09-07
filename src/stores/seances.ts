import { defineStore } from "pinia";
import { useUiStore } from "@/stores/ui";
import { getDaySeance } from "@/api/seancesService";
import { notify } from "@kyvg/vue3-notification";
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
      const uiStore = useUiStore();
      uiStore.seancesLoading = true;
      try {
        const data = await getDaySeance(this.selectedDate);
        this.currentSeances = data;
      } catch (err) {
        notify({ type: "error", text: "Could not get seances..." });
        this.currentSeances = [];
      } finally {
        uiStore.seancesLoading = false;
      }
    },
  },
});
