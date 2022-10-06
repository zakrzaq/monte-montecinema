import { defineStore } from "pinia";
import type { Seance, CompleteSeance } from "@/types/seance";
import type { TempTicket } from "@/types/reservations";

interface RootState {
  selectedSeance: Seance;
  selectedReservation: CompleteSeance;
  selectedTickets: TempTicket[] | [];
  madeReservationId: number;
}

export const useBookingStore = defineStore({
  id: "bookingStore",
  state: () => {
    return {
      selectedSeance: {},
      selectedReservation: {},
      selectedTickets: [],
      madeReservationId: 0,
    } as RootState;
  },
  getters: {},
  actions: {
    clearSelectedTickets() {
      this.selectedTickets = [];
      this.madeReservationId = 0;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
