import { defineStore } from "pinia";
import { getMovieList } from "@/api/movieService";
import { notify } from "@kyvg/vue3-notification";
import { useUiStore } from "@/stores/ui";
import type { Movie } from "@/types/movie";

interface RootState {
  movieList: Movie[] | [];
}

export const useMovieStore = defineStore({
  id: "movieStore",
  state: () => {
    return {
      movieList: [],
    } as RootState;
  },
  getters: {
    genreList(): string[] {
      return [
        "All categories",
        ...new Set(this.movieList.map((movie) => movie.genre.name)),
      ];
    },
    titleList: (state) => {
      return ["All movies", ...state.movieList.map((movie) => movie.title)];
    },
    movieById: (state) => {
      return (id: number) => state.movieList.find((movie) => movie.id === id);
    },
  },
  actions: {
    async fetchMovieList() {
      const uiStore = useUiStore();
      uiStore.moviesLoading = true;
      try {
        const data = await getMovieList();
        this.movieList = data;
      } catch (err) {
        notify({ type: "error", text: "Could not get movies..." });
      } finally {
        uiStore.moviesLoading = false;
      }
    },
  },
});
