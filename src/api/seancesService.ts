import axios from 'axios'
import type { Seance } from '@/types/seance'

axios.defaults.baseURL = 'http://localhost:3000';

export const getAllSeance = async (): Promise<Seance[]> => {
  const response = await axios.get('/seances') 
  return response.data
}

export const getDaySeance = async (date: string): Promise<Seance[]> => {
  const response = await axios.get(`/seances?date=${date}`) 
  if (response.data) return response.data
  return [] 
}


