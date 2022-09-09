export const ticketIds = [
  {
    id: 1,
    type: "Adult",
    price: "20.0",
  },
  {
    id: 2,
    type: "Senior",
    price: "15.0",
  },
  {
    id: 3,
    type: "Child",
    price: "10.0",
  },
  {
    id: 4,
    type: "Student",
    price: "12.0",
  },
];

export const getTicketById = (id: number) => {
  return ticketIds.find((ticket) => ticket.id === id);
};
