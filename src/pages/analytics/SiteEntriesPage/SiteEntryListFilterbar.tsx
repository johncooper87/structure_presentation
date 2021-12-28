import { Divider } from '@material-ui/core';
import { FilterBar, DatePicker } from 'components';
import {
  EnterpriseSelect,
  ConstructionSiteSelect,
  OrderSelect,
  PageSizeSelect,
  WorkerSelect,
} from 'templates/inputs';
import * as yup from 'yup';

export const siteEntryRequestParamsVS = yup.object().shape({
  start: yup.string().nullable().required(),
  end: yup.string().nullable().required(),
  enterpriseId: yup.string().nullable().required(),
  workerId: yup.string().nullable().required(),
});

const initialValues = {
  start: new Date().toISOString().slice(0, 10),
  end: new Date().toISOString().slice(0, 10),
};

function SiteEntryListFilterbar() {
  return (
    <FilterBar initialValues={initialValues} validate={siteEntryRequestParamsVS}>
      <EnterpriseSelect />
      <WorkerSelect />
      <ConstructionSiteSelect />
      <DatePicker name="start" label="Начало" />
      <DatePicker name="end" label="Конец" />
      <Divider />
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

export default SiteEntryListFilterbar;
