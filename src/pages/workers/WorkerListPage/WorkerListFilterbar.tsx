import { FilterBar, Select, SelectItem, TextField } from 'components';
import {
  EnterpriseSelect,
  ConstructionSiteSelect,
  OrderSelect,
  PageSizeSelect,
} from 'templates/inputs';
import PositionSelect from '../PositionSelect';

function WorkerListFilterbar() {
  return (
    <FilterBar>
      <PageSizeSelect />
      <Select name="gender" label="Пол">
        <SelectItem value="" label="Не важно" />
        <SelectItem value="male" label="Мужской" />
        <SelectItem value="female" label="Женский" />
      </Select>
      <PositionSelect multiple />
      <TextField name="fullname" label="ФИО" />
      <EnterpriseSelect multiple />
      <ConstructionSiteSelect multiple />
      <OrderSelect>
        <SelectItem value="" label="Нет" />
        <SelectItem value="fullname" label="ФИО" />
        <SelectItem value="gender" label="Пола" />
        <SelectItem value="enterprise" label="Названия компании" />
        {/* <SelectItem value="constructionSite" label="Названия объекта" /> */}
      </OrderSelect>
    </FilterBar>
  );
}

export default WorkerListFilterbar;
