import type { ShowTicket, Reservation } from "@/types/reservations";

export const createTicketList = (arr: Reservation[]) => {
  let output: ShowTicket[] = [];
  arr.forEach((item) =>
    item.tickets.forEach((ticket) => {
      const next_ticket = {
        ...ticket,
        movie: item.movie_title,
        datetime: item.seance_datetime,
        status: item.status.name,
        email: item.user_email,
      } as ShowTicket;
      output = [...output, next_ticket];
    })
  );
  return output;
};

export default createTicketList;
