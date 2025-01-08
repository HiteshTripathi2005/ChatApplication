const formatTime = (timestamp) => {
  const messageDate = new Date(timestamp);
  const hours = messageDate.getHours();
  const minutes = messageDate.getMinutes();
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

  const now = new Date();
  const isToday = messageDate.toDateString() === now.toDateString();

  if (isToday) {
    return formattedTime;
  }
  return `${messageDate.toLocaleDateString()} ${formattedTime}`;
};

export default formatTime;
