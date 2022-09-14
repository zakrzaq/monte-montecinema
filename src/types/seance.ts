import type { Movie } from "@/types/movie";
export interface Seance {
  id: number;
  datetime: string;
  movie: number;
  hall: number;
}

export interface MovieWithSeances extends Movie {
  screenings: Seance[];
}

export interface CompleteSeance extends Seance {
  available_seats: string[];
  taken_seats: string[];
}
