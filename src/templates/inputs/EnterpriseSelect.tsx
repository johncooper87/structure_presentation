import React from 'react';
import { Autocomplete } from 'components';
import { http } from 'utils';

interface EnterpriseSelectOption {
  id: string;
  name: string;
}

const toEnterpriseSelectOption = ({
  enterprise: { id, name },
}: EnterpriseDTO): EnterpriseSelectOption => ({
  id,
  name,
});

const fields = 'enterprise[id,name]';
async function getEnterpriseListForSelect() {
  const { result }: QueryableResponse<EnterpriseDTO[]> = await http.get('/api/kbi/enterprises', {
    fields,
  });
  return result.map(toEnterpriseSelectOption);
}

const getEnterpriseOptionValue = ({ id }: EnterpriseSelectOption) => id;
const getEnterpriseOptionLabel = ({ name }: EnterpriseSelectOption) => name;

interface EnterpriseSelectProps extends TemplateAutocompleteProps {
  name?: string;
}

function EnterpriseSelect({
  name,
  label,
  multiple,
  disabled,
  filterValues,
  ...props
}: EnterpriseSelectProps) {
  const { data: enterpriseList = [], isFetching } = useQuery(
    'SELECT/ENTERPRISE',
    getEnterpriseListForSelect,
    { cacheTime: 10 * 60 * 1000 }
  );

  return (
    <Autocomplete
      name={name || 'enterpriseId'}
      multiple={multiple}
      label={label ?? (multiple ? 'Компании' : 'Компания')}
      getOptionValue={getEnterpriseOptionValue}
      getOptionLabel={getEnterpriseOptionLabel}
      options={enterpriseList}
      disabled={disabled ?? isFetching}
      filterValues={filterValues ?? !isFetching}
      {...props}
    />
  );
}

export default React.memo(EnterpriseSelect);
