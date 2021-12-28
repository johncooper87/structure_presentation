import { FilterBar, Select, SelectItem, TextField } from 'components';
import { OrderSelect, PageSizeSelect } from 'templates/inputs';

function EnterpriseListFilterbar() {
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
      <OrderSelect>
        <SelectItem value="" label="Нет" />
        <SelectItem value="name" label="Названию" />
        <SelectItem value="address" label="Адреса" />
        <SelectItem value="totalSites" label="Количества объектов" />
        <SelectItem value="totalWorkers" label="Количества сотрудников" />
      </OrderSelect>
    </FilterBar>
  );
}

export default EnterpriseListFilterbar;
