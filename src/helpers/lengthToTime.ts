const lengthToTime = (length: number): string => {
  const hours = Math.floor(length / 60);
  const minutes = length % 60;
  return `${hours ? hours + "h " : ""}${minutes}min`;
};

export default lengthToTime;
