import { defaultClient } from "@/api/client";
import { useUserStore } from "@/stores/user";
import type { Reservation, OnlineReservation } from "@/types/reservations";
const userStore = useUserStore();

export const getSingleReservation = async (id: number) => {
  const response = await defaultClient.get<Reservation>("/reservations", {
    params: { id },
  });
  return response.data;
};

export const getReservations = async (
  email: string,
  page = 1,
  per_page = 25
) => {
  const response = await defaultClient.get<Reservation[]>("/reservations", {
    params: {
      user_email: email,
      page,
      per_page,
    },
    headers: { Authorization: `Bearer ${userStore.authToken}` },
  });
  return response.data;
};

export const postReservation = async (reservation: OnlineReservation) => {
  const response = await defaultClient.post<Reservation>(
    "/reservations/online",
    reservation,
    {
      headers: { Authorization: `Bearer ${userStore.authToken}` },
    }
  );
  return response.data;
};
