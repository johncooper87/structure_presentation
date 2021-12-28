import { FilterBar, Select, SelectItem, TextField } from 'components';
import { OrderSelect, PageSizeSelect, EnterpriseSelect } from 'templates/inputs';

function SiteListFilterbar() {
  return (
    <FilterBar>
      <PageSizeSelect />
      <Select displayEmpty name="status" label="Статус">
        <SelectItem value="" label="Активные" />
        <SelectItem value="archive" label="Архивные" />
        <SelectItem value="any" label="Все" />
      </Select>
      <TextField name="name" label="Название" />
      <TextField name="address" label="Адрес" />
      <EnterpriseSelect multiple />
      {/* <OrderSelect>
        <SelectItem value="" label="Нет" />
        <SelectItem value="name" label="Названию" />
        <SelectItem value="address" label="Адреса" />
        <SelectItem value="totalSites" label="Количества объектов" />
        <SelectItem value="totalWorkers" label="Количества сотрудников" />
      </OrderSelect> */}
    </FilterBar>
  );
}

export default SiteListFilterbar;
