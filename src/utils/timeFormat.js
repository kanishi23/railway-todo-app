export default function timeFormat(date, flag = true) {
  const time = new Date(date);
  const year = time.getFullYear();
  const month = ('0' + String(time.getMonth() + 1)).slice(-2);
  const day = ('0' + String(time.getDate())).slice(-2);
  const hour = ('0' + String(time.getHours())).slice(-2);
  const minutes = ('0' + String(time.getMinutes())).slice(-2);

  if (flag) {
    const format_time = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':00Z';
    return format_time;
  }
  const format_time = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes;
  return format_time;
}
