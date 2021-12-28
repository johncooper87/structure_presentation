import React from 'react';
import { Autocomplete } from 'components';
import { http } from 'utils';

const fields = 'id,displayName';
async function getPositionListForSelect() {
  const { result }: QueryableResponse<Profession[]> = await http.get('/api/worker-professions', {
    fields,
  });
  return result;
}

const getPositionOptionValue = ({ id }: Profession) => id;
const getPositionOptionLabel = ({ displayName }: Profession) => displayName;

interface PositionSelectProps extends TemplateAutocompleteProps {
  name?: string;
}

function PositionSelect({
  name,
  label,
  multiple,
  disabled,
  filterValues,
  ...props
}: PositionSelectProps) {
  const { data: positionList = [], isFetching } = useQuery(
    'SELECT/POSITION',
    getPositionListForSelect,
    { cacheTime: 10 * 60 * 1000 }
  );

  return (
    <Autocomplete
      name={name || 'positionId'}
      multiple={multiple}
      label={label ?? multiple ? 'Должности' : 'Должность'}
      getOptionValue={getPositionOptionValue}
      getOptionLabel={getPositionOptionLabel}
      options={positionList}
      disabled={disabled ?? isFetching}
      filterValues={filterValues ?? !isFetching}
      {...props}
    />
  );
}

export default React.memo(PositionSelect);
