import { DatePicker, FilterBar, Select, SelectItem } from 'components';
import { useFormState } from 'components/Form';
import { ConstructionSiteSelect, EnterpriseSelect } from 'templates';
import { OrderSelect } from 'templates/inputs';
import * as yup from 'yup';

const today = new Date();

function DateFields() {
  const { values } = useFormState<SiteAnalyticsParams>();
  const variant = values.variant;
  if (variant === 'perday')
    return <DatePicker fullWidth required maxDate={today} name="date" label="Дата" />;

  return (
    <>
      <DatePicker fullWidth required maxDate={today} name="start" label="Начало" />
      <DatePicker fullWidth required maxDate={today} name="end" label="Конец" />
    </>
  );
}

const getInitialParams = () =>
  ({
    variant: 'perday',
    date: new Date().toISOString().slice(0, 10),
    start: new Date().toISOString().slice(0, 10),
    // end: new Date(),
    // fragment for debugging
    // ...{
    //   start: new Date('2021-04-15T07:18:00.000Z'),
    //   end: new Date('2021-04-21T07:18:32.130Z'),
    //   enterpriseId: 'a2a3d506-e46e-4d72-98c0-9afc1fe1f1af',
    //   // constructionId: 'bf8a152b-d5d9-4849-8138-efdf2daa7d52',

    //   constructionId: '5fad5a49-4a5d-4caa-8258-d6c99d4a3b6e',
    //   date: new Date('2021-03-30T00:36:54.692Z'),
    // },
  } as Partial<SiteAnalyticsParams>);

export const siteAnalyticsVS = yup.object().shape({
  variant: yup.string().nullable().required('Необходимо указать значение'),
  enterpriseId: yup.string().nullable(),
  constructionId: yup.string().nullable().required('Необходимо указать значение'),
  date: yup
    .string()
    .nullable()
    .when('variant', {
      is: 'perday',
      then: yup.string().required('Необходимо указать значение'),
    }),
  start: yup
    .string()
    .nullable()
    .when('variant', {
      is: 'forperiod',
      then: yup.string().required('Необходимо указать значение'),
    }),
  end: yup
    .string()
    .nullable()
    .when('variant', {
      is: 'forperiod',
      then: yup.string().required('Необходимо указать значение'),
    }),
});

function SiteAnalyticsSearchBar() {
  const initialParams = useMemo(getInitialParams, []);
  return (
    <FilterBar initialValues={initialParams} validate={siteAnalyticsVS}>
      <Select name="variant" label="Вариант">
        <SelectItem value="perday" label="За день" />
        <SelectItem value="forperiod" label="За период" />
      </Select>
      <EnterpriseSelect fullWidth />
      <ConstructionSiteSelect
        enterpriseFieldName="enterpriseId"
        fullWidth
        required
        name="constructionId"
        onlyWithSigurSystem
      />
      <DateFields />
      <OrderSelect>
        <SelectItem value="" label="Нет" />
        <SelectItem value="fullname" label="ФИО" />
        <SelectItem value="position" label="Должность" />
        <SelectItem value="department" label="Подразделение" />
        <SelectItem value="temperature" label="Температура" />
        <SelectItem value="instructed" label="Инструктаж" />
        <SelectItem value="entered" label="Дата и время входа" />
        <SelectItem value="exited" label="Дата и время выхода" />
      </OrderSelect>
    </FilterBar>
  );
}

export default SiteAnalyticsSearchBar;
