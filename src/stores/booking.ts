import { defineStore } from "pinia";
import type { Seance, CompleteSeance } from "@/types/seance";
import type { TempTicket } from "@/types/reservations";

interface RootState {
  selectedSeance: Seance;
  selectedReservation: CompleteSeance;
  selectedTickets: TempTicket[] | [];
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
  actions: {
    clearSelectedTickets() {
      this.selectedTickets = [];
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
