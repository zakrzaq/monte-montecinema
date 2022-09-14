export interface Ticket {
  id: number;
  price: string;
  seat: string;
  type: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Reservation {
  id: number;
  user_id: number;
  user_email: string;
  movie_title: string;
  seance_id: number;
  seance_datetime: string;
  status: Status;
  tickets: Ticket[];
}

export interface ShowTicket extends Ticket {
  movie: string;
  datetime: string;
  status: string;
}

export interface TempTicket {
  seat: string;
  ticket_type_id: number;
}

export interface OnlineReservation {
  seance_id: number;
  tickets: TempTicket[];
}
