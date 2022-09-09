import { defineStore } from "pinia";
import type { Seance, CompleteSeance } from "@/types/seance";

interface RootState {
  selectedSeance: Seance;
  selectedReservation: CompleteSeance;
  selectedTickets: { seat: string; ticket_type_id: number }[] | [];
}

export const useBookingStore = defineStore({
  id: "bookingStore",
  state: () => {
    return {
      selectedSeance: {},
      selectedReservation: {},
      selectedTickets: [],
    } as RootState;
  },
  getters: {},
  actions: {},
  persist: {
    storage: sessionStorage,
  },
});
