import { Select, SelectItem } from 'components';

const timeZoneList = [
  { label: 'UTC−12 Baker Island', value: '-12' },
  { label: 'UTC-11 American Samoa', value: '-11' },
  { label: 'UTC-10 Hawaii', value: '-10' },
  { label: 'UTC-9 Alaska', value: '-9' },
  { label: 'UTC-8 Washington', value: '-8' },
  { label: 'UTC-7 Colorado', value: '-7' },
  { label: 'UTC-6 Wisconsin', value: '-6' },
  { label: 'UTC-5 New York', value: '-5' },
  { label: 'UTC-4 Pennsylvania', value: '-4' },
  { label: 'UTC-3 New Brunswick', value: '-3' },
  { label: 'UTC-2 Fernando de Noronha', value: '-2' },
  { label: 'UTC-1 Azores islands', value: '-1' },
  { label: 'UTC+0 London', value: '0' },
  { label: 'UTC+1 Berlin', value: '1' },
  { label: 'UTC+2 Калининград', value: '2' },
  { label: 'UTC+3 Москва', value: '3' },
  { label: 'UTC+4 Самара', value: '4' },
  { label: 'UTC+5 Екатеринбург', value: '5' },
  { label: 'UTC+6 Омск', value: '6' },
  { label: 'UTC+7 Кемерово', value: '7' },
  { label: 'UTC+8 Иркутск', value: '8' },
  { label: 'UTC+9 Якутск', value: '9' },
  { label: 'UTC+10 Владивосток', value: '10' },
  { label: 'UTC+11 Южно-Сахалинск', value: '11' },
  { label: 'UTC+12 Петропавловск-Камчатский', value: '12' },
  { label: 'UTC+13 Phoenix Islands', value: '13' },
  { label: 'UTC+14 Line Islands', value: '14' },
];

function TimeZoneSelect() {
  return (
    <Select fullWidth name="timeZone" label="Часовой пояс">
      {timeZoneList.map(timeZone => (
        <SelectItem key={timeZone.value} {...timeZone} />
      ))}
    </Select>
  );
}

export default TimeZoneSelect;
