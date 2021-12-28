import React from 'react';
import { Autocomplete } from 'components';
import { http } from 'utils';

const fields = 'id,displayName';
async function getRoleListForSelect() {
  const { result }: QueryableResponse<Profession[]> = await http.get('/api/user-roles', {
    fields,
  });
  return result;
}

const getRoleOptionValue = ({ id }: Profession) => id;
const getRoleOptionLabel = ({ displayName }: Profession) => displayName;

interface RoleSelectProps extends TemplateAutocompleteProps {
  name?: string;
}

function RoleSelect({ name, label, multiple, disabled, filterValues, ...props }: RoleSelectProps) {
  const { data: roleList = [], isFetching } = useQuery('SELECT/ROLE', getRoleListForSelect, {
    cacheTime: 10 * 60 * 1000,
  });

  return (
    <Autocomplete
      name={name || 'roleId'}
      multiple={multiple}
      label={label ?? multiple ? 'Роли' : 'Роль'}
      getOptionValue={getRoleOptionValue}
      getOptionLabel={getRoleOptionLabel}
      options={roleList}
      disabled={disabled ?? isFetching}
      filterValues={filterValues ?? !isFetching}
      {...props}
    />
  );
}

export default React.memo(RoleSelect);
