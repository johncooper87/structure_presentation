import { DatePicker, FilterBar } from 'components';
import { useFormState } from 'components/Form';
import { ConstructionSiteSelect, EnterpriseSelect } from 'templates';
import * as yup from 'yup';

const today = new Date();

const getInitialParams = () =>
  ({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
    // fragment for debugging
    // ...{
    //   start: new Date('2021-04-15T07:18:00.000Z'),
    //   end: new Date('2021-04-21T07:18:32.130Z'),
    //   enterpriseId: 'a2a3d506-e46e-4d72-98c0-9afc1fe1f1af',
    //   // constructionId: 'bf8a152b-d5d9-4849-8138-efdf2daa7d52',

    //   constructionId: '5fad5a49-4a5d-4caa-8258-d6c99d4a3b6e',
    //   date: new Date('2021-03-30T00:36:54.692Z'),
    // },
  } as Partial<TemperatureReportParams>);

export const temperatureReportVS = yup.object().shape({
  enterpriseId: yup.string().nullable(),
  constructionId: yup.string().nullable().required('Необходимо указать значение'),
  start: yup
    .string()
    .nullable()
    .required('Необходимо указать значение')
    .test('less-than-end-date', 'Дата не может быть больше даты окончания', (value, context) => {
      const endDate = context.parent.end;
      if (!value || !endDate) return true;
      // eslint-disable-next-line no-unneeded-ternary
      return new Date(value) > new Date(endDate) ? false : true;
    }),
  end: yup.string().nullable().required('Необходимо указать значение'),
});

function StartDateField() {
  const { values } = useFormState<TemperatureReportParams>();
  return <DatePicker fullWidth maxDate={values.end} required name="start" label="Начало" />;
}

function TemperatureSearchBar() {
  const initialParams = useMemo(getInitialParams, []);
  return (
    <FilterBar initialValues={initialParams} validate={temperatureReportVS}>
      <EnterpriseSelect fullWidth />
      <ConstructionSiteSelect
        enterpriseFieldName="enterpriseId"
        fullWidth
        required
        name="constructionId"
        onlyWithSigurSystem
      />
      <StartDateField />
      <DatePicker
        fullWidth
        required
        maxDate={today}
        maxDateMessage="Дата не может быть больше сегодняшней"
        name="end"
        label="Конец"
      />
    </FilterBar>
  );
}

export default TemperatureSearchBar;
