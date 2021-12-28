import { addMilliseconds, formatDistance } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

function formatDuration(duration: number) {
  const now = new Date();
  const distanteDate = addMilliseconds(now, duration);
  return formatDistance(distanteDate, now, { locale: ruLocale });
}

// function formatDuration(firstDate: number | Date, secondDate?: number | Date) {
//   const second = secondDate ?? new Date();
//   const first = firstDate ?? addMilliseconds(second, firstDate as number);
//   return formatDistance(first, second, { locale: ruLocale });
// }

export default formatDuration;
