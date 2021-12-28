export default function displayDate(date) {
  if (date instanceof Date) {
    return [
      ('0' + date.getDate()).slice(-2),
      ('0' + date.getMonth()).slice(-2),
      date.getFullYear(),
    ].join('.');
  }

  if (typeof date === 'string' && date) {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${day}.${month}.${year}`;
  }

  return null;
}
