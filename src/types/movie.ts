export interface Movie {
  id: number;
  title: string;
  genre: {
    id: number;
    name: string;
  };
  length: number;
  poster_url: string;
  release_date: string;
  description: string;
}
