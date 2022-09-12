export const prettyDate = (dateString: string, type?: number): string => {
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
  const hours = new Date(dateString).getHours();
  let minutes: string | number = new Date(dateString).getMinutes();
  minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);
  return type === 1
    ? `${dayName}, ${date} - ${hours}:${minutes}`
    : `${dayName} ${date}`;
};
