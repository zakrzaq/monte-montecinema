const seatDescription = (seat: string) => {
  return `Row ${seat.substring(0, 1)}, Seat ${seat.substring(1)}`;
};

export default seatDescription;
