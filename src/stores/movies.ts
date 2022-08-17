import { defineStore } from "pinia";
import { getMovieList } from "@/api/movieService";
import type { Movie } from "@/types/movie";

interface RootState {
  movieList: Movie[];
  loading: boolean;
}

export const useMovieStore = defineStore({
  id: "movieStore",
  state: () => {
    return {
      movieList: null as Movie[] | null,
      loading: false,
    };
  },
  actions: {
    async fetchMovieList() {
      this.loading = true;
      try {
        const data = await getMovieList();
        this.movieList = data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
