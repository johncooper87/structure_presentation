import { FilterBar, Select, SelectItem, TextField } from 'components';
import {
  EnterpriseSelect,
  ConstructionSiteSelect,
  OrderSelect,
  PageSizeSelect,
} from 'templates/inputs';

function DeviceListFilterbar() {
  return (
    <FilterBar>
      <PageSizeSelect />
      <Select displayEmpty name="status" label="Статус">
        <SelectItem value="" label="Активные" />
        <SelectItem value="archive" label="Архивные" />
        <SelectItem value="any" label="Все" />
      </Select>
      <TextField name="serialNumber" label="Серийный номер" />
      <Select name="type" label="Тип">
        <SelectItem value="" label="Любой" />
        <SelectItem value="watch" label="Часы" />
        <SelectItem value="card" label="Карта" />
      </Select>
      <Select name="attached" label="Выдано">
        <SelectItem value="" label="Не важно" />
        <SelectItem value={true} label="Да" />
        <SelectItem value={false} label="Нет" />
      </Select>
      <TextField name="workerName" label="Сотрудник" />
      <EnterpriseSelect multiple />
      <ConstructionSiteSelect multiple />
      <OrderSelect>
        <SelectItem value="" label="Нет" />
        <SelectItem value="serialNumber" label="Серийного номера" />
        <SelectItem value="worker" label="ФИО сотрудника" />
        <SelectItem value="enterprise" label="Названия компании" />
      </OrderSelect>
    </FilterBar>
  );
}

export default DeviceListFilterbar;
