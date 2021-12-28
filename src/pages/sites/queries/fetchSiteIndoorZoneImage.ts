import { http, notify } from 'utils';

async function fetchSiteIndoorZoneImage(id: string) {
  const result = await http.get(
    `/api/indoor/mappictures/getfilebyindoorzoneid?indoorZoneId=${id}`,
    {},
    { onError: () => notify.error('Не удалось получить изображение помещения объекта') }
  );
  const blob = await result.blob();
  return URL.createObjectURL(blob);
}

export default fetchSiteIndoorZoneImage;
