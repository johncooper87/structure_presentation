import { FilterBar, Select, SelectItem, TextField } from 'components';
import {
  EnterpriseSelect,
  ConstructionSiteSelect,
  OrderSelect,
  PageSizeSelect,
} from 'templates/inputs';

function AlertListFilterbar() {
  return (
    <FilterBar>
      <Select name="status" label="Статус">
        <SelectItem value="" label="Любой" />
        <SelectItem value="unresponded" label="Неотреагированный" />
        <SelectItem value="responded" label="Отреагированный" />
      </Select>
      <TextField name="workerName" label="ФИО сотрудник" />
      <TextField name="enterpiseName" label="Название компании" />
      <TextField name="siteName" label="Название объекта" />
      {/* <EnterpriseSelect />
      <ConstructionSiteSelect /> */}
      <PageSizeSelect />
      {/* <OrderSelect>
        <SelectItem value="" label="Нет" />
        <SelectItem value="serialNumber" label="Серийного номера" />
        <SelectItem value="worker" label="ФИО сотрудника" />
        <SelectItem value="enterprise" label="Названия компании" />
      </OrderSelect> */}
    </FilterBar>
  );
}

export default AlertListFilterbar;
