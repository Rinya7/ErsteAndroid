export const getFormattedDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Месяцы начинаются с 0
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
