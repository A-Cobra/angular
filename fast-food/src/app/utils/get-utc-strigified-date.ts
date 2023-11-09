export function getUtcStringifiedDate() {
  const currentTime = new Date();
  let year = String(currentTime.getFullYear());
  let month = String(currentTime.getMonth() + 1);
  let day = String(currentTime.getDate());
  let hour = String(currentTime.getHours());
  let minute = String(currentTime.getMinutes());
  let second = String(currentTime.getSeconds());
  if (month.length == 1) {
    month = '0' + month;
  }
  if (day.length == 1) {
    day = '0' + day;
  }
  if (hour.length == 1) {
    hour = '0' + hour;
  }
  if (minute.length == 1) {
    minute = '0' + minute;
  }
  if (second.length == 1) {
    second = '0' + second;
  }
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}
