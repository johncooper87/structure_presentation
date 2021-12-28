import { Select, SelectItem } from 'components';

interface PageSizeSelectProps {
  children?: ReactNode;
}

function PageSizeSelect({ children }: PageSizeSelectProps) {
  const _children = children || [
    <SelectItem key={0} value={5} label="5" />,
    <SelectItem key={1} value="" label="10" />,
    <SelectItem key={2} value={15} label="15" />,
    <SelectItem key={3} value={25} label="25" />,
    <SelectItem key={4} value={50} label="50" />,
  ];
  return (
    <Select displayEmpty defaultValue={10} name="pageSize" label="Элементов на странице">
      {_children}
    </Select>
  );
}

export default PageSizeSelect;
