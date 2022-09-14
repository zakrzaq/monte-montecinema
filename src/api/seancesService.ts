import { defaultClient } from "./client";
import type { Seance, CompleteSeance } from "@/types/seance";

export const getAllSeance = async (): Promise<Seance[]> => {
  const response = await defaultClient.get("/seances");
  return response.data;
};

export const getDaySeance = async (date: string): Promise<Seance[]> => {
  const response = await defaultClient.get(`/seances?date=${date}`);
  if (response.data) return response.data;
  return [];
};

export const getSeanceById = async (id: number): Promise<CompleteSeance> => {
  const response = await defaultClient.get(`/seances/${id}`);
  return response.data;
};
