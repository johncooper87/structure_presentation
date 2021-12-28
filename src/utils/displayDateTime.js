import displayDate from './displayDate';
import displayTime from './displayTime';

export default function displayDateTime(date) {
  if (!date) return null;
  return displayDate(date) + ' ' + displayTime(date);
}
