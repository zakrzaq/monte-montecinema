import { defineStore } from "pinia";

interface RootState {
  moviesLoading: boolean;
  seancesLoading: boolean;
}

export const useUiStore = defineStore("uiStore", {
  state: () => {
    return {
      moviesLoading: false,
      seancesLoading: false,
    } as RootState;
  },
  getters: {},
  actions: {},
});
