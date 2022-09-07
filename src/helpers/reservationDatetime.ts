export const reservationDatetime = (dateString: string): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = new Date(dateString);
  const dayName = days[day.getDay()];
  const date = new Date(dateString).toLocaleDateString();
  const time = new Date(dateString).toLocaleTimeString();
  return `${dayName} ${date} - ${time}`;
};

export default reservationDatetime;
