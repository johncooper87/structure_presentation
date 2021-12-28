import { Divider } from '@material-ui/core';
import { FilterBar } from 'components';
import {
  EnterpriseSelect,
  ConstructionSiteSelect,
  OrderSelect,
  PageSizeSelect,
  WorkerSelect,
} from 'templates/inputs';
import * as yup from 'yup';

export const recentDataRequestParamsVS = yup.object().shape({
  enterpriseId: yup.string().nullable().required(),
});

function RecentDataListFilterbar() {
  return (
    <FilterBar validate={recentDataRequestParamsVS}>
      <EnterpriseSelect />
      <ConstructionSiteSelect />
      <WorkerSelect />
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

export default RecentDataListFilterbar;
