import { defineStore } from "pinia";
import { getMovieList } from "@/api/movieService";
import type { Movie } from "@/types/movie";

interface RootState {
  movieList: Movie[] | [];
  loading: boolean;
}

export const useMovieStore = defineStore({
  id: "movieStore",
  state: () => {
    return {
      movieList: [] as Movie[] | [],
      loading: false,
    } as RootState;
  },
  getters: {
    genreList(): string[] {
      return [...new Set(this.movieList.map((movie) => movie.genre.name))];
    },
  },
  actions: {
    async fetchMovieList() {
      this.loading = true;
      try {
        const data = await getMovieList();
        this.movieList = data;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
