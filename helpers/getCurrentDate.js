const getCurrentDate = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = yesterday.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default getCurrentDate;
