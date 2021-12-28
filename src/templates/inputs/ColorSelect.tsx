import { Select, SelectItem, allColors } from 'components';

interface ColorSelectItemProps {
  value: string;
}

export function ColorSelectItem({ value }: ColorSelectItemProps) {
  return <div style={{ width: '64px', height: '18px', backgroundColor: value }} />;
}

const colorItems = allColors.map(value => (
  <SelectItem key={value} value={value}>
    <ColorSelectItem value={value} />
  </SelectItem>
));

interface ColorSelectProps {
  children?: ReactNode;
  name?: string;
}

function ColorSelect({ children, name = 'color' }: ColorSelectProps) {
  return (
    <Select displayEmpty name={name} label="Цвет" style={{ width: '120px' }}>
      {colorItems}
      {children}
    </Select>
  );
}

export default ColorSelect;
