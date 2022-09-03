import { defaultClient } from "./client";
import type { Movie } from "@/types/movie";

export const getMovieList = async (): Promise<Movie[]> => {
  const response = await defaultClient.get("/movies");
  return response.data;
};
