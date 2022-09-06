import { defaultClient } from "@/api/client";
import { useUserStore } from "@/stores/user";
import type { Reservation } from "@/types/reservations";
const userStore = useUserStore();

export const getReservations = async (
  email: string,
  page = 1,
  per_page = 10
) => {
  const response = await defaultClient.get(
    `/reservations?user_email=${email}&page=${page}&per_page=${per_page}`,
    {
      headers: { Authorization: `Bearer ${userStore.authToken}` },
    }
  );
  return response.data as Reservation[];
};
