import { Divider } from '@material-ui/core';
import { FilterBar, DatePicker, Select, SelectItem } from 'components';
import {
  EnterpriseSelect,
  ConstructionSiteSelect,
  WorkerSelect,
  PageSizeSelect,
} from 'templates/inputs';
import * as yup from 'yup';

export const t12ReportRequestParamsVS = yup.object().shape({
  date: yup.string().nullable().required(),
  enterpriseId: yup.string().nullable().required(),
  constructionSiteId: yup.string().nullable().required(),
});

const initialValues = {
  date: new Date().toISOString().slice(0, 10),
};

function T12ReportFilterbar() {
  return (
    <FilterBar initialValues={initialValues} validate={t12ReportRequestParamsVS}>
      <DatePicker
        name="date"
        label="Дата"
        views={['month', 'year']}
        openTo="month"
        format="MM.yyyy"
        disableKeyboardInput
      />
      <EnterpriseSelect />
      <ConstructionSiteSelect onlyWithSigurSystem={null} />
      <WorkerSelect />
      <Divider />
      <PageSizeSelect />
      <Select displayEmpty name="view" label="Отображение">
        <SelectItem value="" label="Стандартное" />
        <SelectItem value="alternative" label="Альтернативное" />
      </Select>
    </FilterBar>
  );
}

export default T12ReportFilterbar;
