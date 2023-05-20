import { defaultClient } from "./client";
import { movies } from "@/data";
import type { Movie } from "@/types/movie";

export const getMovieList = async (): Promise<Movie[]> => {
  // const response = await defaultClient.get("/movies");
  // return response.data;
  return movies;
};
