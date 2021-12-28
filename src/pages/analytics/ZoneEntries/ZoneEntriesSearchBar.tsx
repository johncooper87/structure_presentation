import { DatePicker, FilterBar } from 'components';
import { ConstructionSiteSelect, EnterpriseSelect, WorkerSelect, ZoneSelect } from 'templates';
import * as yup from 'yup';

export const zoneEntriesReportParamsVS = yup.object().shape({
  enterpriseId: yup.string().nullable().required('Необходимо указать значение'),
  constructionId: yup.string().nullable().required('Необходимо указать значение'),
  begin: yup.string().nullable().required('Необходимо указать значение'),
  end: yup.string().nullable().required('Необходимо указать значение'),
});

const getInitialParams = () =>
  ({
    begin: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
    // fragment for debugging
    // ...{
    //   begin: new Date('2021-04-15T07:18:00.000Z'),
    //   end: new Date('2021-04-21T07:18:32.130Z'),
    //   enterpriseId: 'a2a3d506-e46e-4d72-98c0-9afc1fe1f1af',
    //   constructionId: 'bf8a152b-d5d9-4849-8138-efdf2daa7d52',
    // },
  } as Partial<ZoneEntriesReportParams>);

const ZoneEntriesSearchBar = () => {
  const initialParams = useMemo(getInitialParams, []);
  return (
    <FilterBar initialValues={initialParams} validate={zoneEntriesReportParamsVS}>
      <EnterpriseSelect fullWidth required />
      <WorkerSelect fullWidth />
      <ConstructionSiteSelect
        fullWidth
        required
        name="constructionId"
        workerFieldName="workerId"
        onlyWithSigurSystem={false}
      />
      <ZoneSelect fullWidth constructionSiteFieldName="constructionId" />
      <DatePicker fullWidth required name="begin" label="Начало" />
      <DatePicker fullWidth required name="end" label="Конец" />
    </FilterBar>
  );
};

export default ZoneEntriesSearchBar;
