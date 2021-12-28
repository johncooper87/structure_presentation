import { TextField, TextFieldProps } from '@material-ui/core';
import { Autocomplete as MuiAutocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';

import { useField, shouldDisplayFieldError, fieldSubscription } from 'components/Form';
import { useMutableState } from 'hooks';
import { classes } from 'utils';
import useDerivedFieldProps from './useDerivedFieldProps';
import styles from './styles.module.scss';

export type AutocompleteProps = Omit<TextFieldProps, 'value' | 'onChange' | 'onBlur'> & {
  validate?: FieldValidator<OptionValue | OptionValue[]>;
  getOptionValue: (option: SelectOption) => OptionValue;
  selectFirst?: boolean;
  readOnly?: boolean;

  filterValues?: boolean;
  multiple?: boolean;
  getOptionLabel: (option: SelectOption) => string;
  renderOption?: (option: SelectOption) => ReactNode;
  options?: SelectOption[];
};

function Autocomplete({
  name,
  validate,
  selectFirst,
  filterValues,
  getOptionValue,

  fullWidth,
  multiple,
  getOptionLabel,
  renderOption,
  options,

  ...props
}: AutocompleteProps) {

  const { className, disabled, ...derivedProps } = useDerivedFieldProps(props);

  const field = useField<OptionValue | OptionValue[]>(name, { validate, subscription: fieldSubscription });
  const { value, change, blur, error } = field;

  const handleChange = useCallback((event, nextValue) => change(nextValue), []);

  const shouldDisplayError = shouldDisplayFieldError(field);

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...derivedProps}
      {...params}
      error={shouldDisplayError}
      helperText={shouldDisplayError ? error : props.helperText}
    />
  );

  const optionValues = useMemo(() => options?.map(getOptionValue), [getOptionValue, options]);
  const optionLabels = useMemo(() => options?.map(getOptionLabel), [getOptionLabel, options]);

  const handleGetOptionLabel = useCallback(optionValue => {
    const optionIndex = optionValues?.indexOf(optionValue) ?? -1;
    if (optionIndex === -1) return '';
    return optionLabels[optionIndex];
  }, [optionValues, optionLabels]);

  const handleRenderOption = useCallback(optionValue => {
    const optionIndex = optionValues?.indexOf(optionValue) ?? -1;
    if (optionIndex === -1) return null;
    return renderOption == null
      ? optionLabels[optionIndex]
      : renderOption(options[optionIndex]);
  }, [renderOption, optionLabels]);

  const handleGetOptionSelected = useCallback((option, value) => {
    if (multiple && value instanceof Array) return value.includes(option);
    return value === option;
  }, [multiple]);

  // alters field value by deleting items that has no corresponding option value
  useEffect(() => {
    if (!filterValues || optionValues == null || value == null) return;
    if (value instanceof Array) {
      if (value.length === 0) return;
      const filteredValue = value.filter(val => optionValues.includes(val));
      if (!shallowEqual(filteredValue, value)) change(filteredValue);
    } else if (!optionValues.includes(value)) change(null);
  }, [filterValues, optionValues]);
  //

  // setlectFirst routine
  const current = useMutableState<{ firstSelected: boolean }>();
  if (current.firstSelected === undefined) {
    current.firstSelected = !(value instanceof Array ? value.length === 0 : value == null);
  }
  useEffect(() => {
    if (!selectFirst || current.firstSelected) return;
    const firstValue = optionValues?.[0];
    if (firstValue === undefined) return;
    change(multiple ? [firstValue] : firstValue);
    current.firstSelected = true;
  }, [selectFirst, multiple, options]);
  //

  return (
    <MuiAutocomplete<SelectOption, boolean>
      value={value ?? (multiple ? [] : null)}
      onChange={handleChange}
      onBlur={blur}

      renderOption={handleRenderOption}
      getOptionLabel={handleGetOptionLabel}
      getOptionSelected={handleGetOptionSelected}
      options={optionValues}

      className={classes(styles.autocomplete, className)}
      filterSelectedOptions={multiple}
      {...{ multiple, fullWidth, disabled, renderInput }}
    />
  );
}

export default React.memo(Autocomplete);
