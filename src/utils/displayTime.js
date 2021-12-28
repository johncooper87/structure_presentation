export default function displayDate(date) {
  if (date instanceof Date) {
    return [
      ('0' + date.getHours()).slice(-2),
      ('0' + date.getMinutes()).slice(-2),
      ('0' + date.getSeconds()).slice(-2),
    ].join(':');
  }

  if (typeof date === 'string' && date) {
    const hours = date.slice(8, 10);
    const minutes = date.slice(10, 12);
    const seconds = date.slice(12, 14);
    return `${hours}:${minutes}:${seconds}`;
  }

  return null;
}
