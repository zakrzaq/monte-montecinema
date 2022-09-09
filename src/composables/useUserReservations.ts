import { ref } from "vue";
import { getReservations } from "@/api/reservationsService";
import type { Reservation } from "@/types/reservations";

export default async (email: string, post: number, per_page: number) => {
  const reservations = ref<Reservation[]>();
  const loading = ref(false);
  const error = ref<Error | null | unknown>();

  try {
    loading.value = true;
    const response = await getReservations(email, post, per_page);
    reservations.value = response;
  } catch (err: unknown) {
    error.value = err;
    console.error(err);
  } finally {
    loading.value = false;
  }

  return {
    reservations,
    loading,
    error,
  };
};
