import axios from 'axios'
import type { MovieList } from '@/types/movie'

// axios.defaults.baseURL = import.meta.env.VITE_API;
axios.defaults.baseURL = 'http://localhost:3000';

export const getMovieList = async (): Promise<MovieList> => {
  const response = await axios.get('/movies') 
  return response.data
}
