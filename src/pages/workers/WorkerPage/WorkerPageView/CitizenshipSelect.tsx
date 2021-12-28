import React from 'react';
import { Autocomplete } from 'components';
import countries from 'assets/countries.json';

const getCitizenshipOptionValue = ({ code }: Country) => code;
const getCitizenshipOptionLabel = ({ name }: Country) => name.ru;

interface CitizenshipSelectProps extends TemplateAutocompleteProps {
  name?: string;
}

function CitizenshipSelect({
  name,
  label,
  multiple,
  disabled,
  filterValues,
  ...props
}: CitizenshipSelectProps) {
  return (
    <Autocomplete
      name={name || 'citizenship'}
      multiple={multiple}
      label={label ?? multiple ? 'Гражданства' : 'Гражданство'}
      getOptionValue={getCitizenshipOptionValue}
      getOptionLabel={getCitizenshipOptionLabel}
      options={countries}
      disabled={disabled}
      filterValues={filterValues}
      {...props}
    />
  );
}

export default React.memo(CitizenshipSelect);
