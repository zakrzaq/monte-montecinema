export interface Movie {
  id: number;
  title: string;
  genre: Genre;
  length: number;
  poster_url: string;
  release_date: string;
  description: string;
}
export interface Genre {
  id: number;
  name: string;
}
