import { FilterBar, Select, SelectItem, TextField } from 'components';
import {
  EnterpriseSelect,
  ConstructionSiteSelect,
  OrderSelect,
  PageSizeSelect,
} from 'templates/inputs';

function UserListFilterbar() {
  return (
    <FilterBar>
      <PageSizeSelect />
      <Select name="status" label="Статус">
        <SelectItem value="" label="Не важно" />
        <SelectItem value="blocked" label="Заблокирован" />
        <SelectItem value="active" label="Активный" />
      </Select>
      <TextField name="fullname" label="ФИО" />
      <TextField name="roleName" label="Название роли" />
      <TextField name="enterpriseName" label="Название компании" />
      {/* <OrderSelect>
        <SelectItem value="" label="Нет" />
        <SelectItem value="fullname" label="ФИО" />
        <SelectItem value="gender" label="Пола" />
        <SelectItem value="enterprise" label="Названия компании" />
      </OrderSelect> */}
    </FilterBar>
  );
}

export default UserListFilterbar;
