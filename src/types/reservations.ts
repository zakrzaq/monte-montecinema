export interface Ticket {
  id: number;
  price: string;
  seat: string;
  type: string;
}

export interface Reservation {
  id: number;
  user_id: number;
  user_email: string;
  movie_title: string;
  seance_id: number;
  seance_datetime: string;
  status: {
    id: number;
    name: string;
  };
  tickets: Ticket[];
}
