import { defaultClient } from "./client";
import type { Seance, CompleteSeance } from "@/types/seance";
import { seances } from "@/data";

export const getAllSeance = async (): Promise<Seance[]> => {
  // const response = await defaultClient.get("/seances");
  // return response.data;
  return seances;
};

export const getDaySeance = async (date: string): Promise<Seance[]> => {
  // const response = await defaultClient.get(`/seances?date=${date}`);
  // if (response.data) return response.data;
  // return [];
  return seances.filter((seance) => seance.datetime.includes(date));
};

export const getSeanceById = async (id: number): Promise<CompleteSeance> => {
  const response = await defaultClient.get(`/seances/${id}`);
  return response.data;
};
