export const prettyDate = (dateString: string): string => {
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
  return `${dayName}, ${date}`;
};
