import { ref, watchEffect } from "vue";
import { getReservations } from "@/api/reservationsService";
import { notify } from "@kyvg/vue3-notification";
import type { ShowTicket, Reservation } from "@/types/reservations";

export const useReservations = async (email = "", pages = 1, per_page = 25) => {
  const loading = ref(false);
  const error = ref(false);
  const currentReservations = ref<Reservation[]>([]);
  const currentTickets = ref<ShowTicket[]>([]);

  const fetchReservations = async () => {
    try {
      loading.value = true;
      const response = await getReservations(email, pages, per_page);
      currentReservations.value = currentReservations.value
        ? [...currentReservations.value, ...response]
        : response;
      if (currentReservations.value)
        currentReservations.value.forEach((res) =>
          res.tickets.forEach((ticket) => {
            const next_ticket = {
              ...ticket,
              movie: res.movie_title,
              datetime: res.seance_datetime,
              status: res.status.name,
              email: res.user_email,
            } as ShowTicket;
            currentTickets.value = [...currentTickets.value, next_ticket];
          })
        );
    } catch (err) {
      console.error(err);
      notify({ type: "error", text: "We could not get reservations" });
      error.value = true;
      currentTickets.value = [];
    } finally {
      loading.value = false;
      // console.log(currentTickets.value);
    }
  };
  watchEffect(() => {
    fetchReservations();
  });
  // console.log([loading, error, currentTickets, currentReservations]);
  return { loading, error, currentTickets, currentReservations };
};
