import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { useField, shouldDisplayFieldError, fieldSubscription } from 'components/Form';
import useDerivedFieldProps from './useDerivedFieldProps';

export type TextFieldProps = Omit<MuiTextFieldProps, 'value' | 'error' | 'type' | 'onChange' | 'onBlur'> & {
  validate?: FieldValidator<string>
  readOnly?: boolean
  type?: 'text' | 'number'
  maxLength?: number
  maskedInputProps?: MaskedInputProps
  onChange?: (value: string) => void
}

function TextField({
  name,
  validate,
  maskedInputProps,
  maxLength,
  onChange,
  ...props
}: TextFieldProps) {

  const { readOnly, ...derivedProps } = useDerivedFieldProps(props);

  const field = useField<string>(name, { validate, subscription: fieldSubscription });
  const { value, change, blur, error } = field;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      change(value);
      onChange?.(value);
    },
    [onChange]
  );

  const displayError = shouldDisplayFieldError(field);

  const maskedInput = useMemo(
    () => {
      if (maskedInputProps?.mask == null) return;
      return ({ inputRef, ..._props }) => (
        <MaskedInput
          ref={ref => inputRef(ref?.inputElement ?? null)}
          placeholderChar="_"
          showMask
          {...maskedInputProps}
          {..._props}
        />
      );
    },
    [maskedInputProps]
  );

  return (
    <MuiTextField
      {...derivedProps}

      value={value ?? ''}
      onChange={handleChange}
      onBlur={blur}

      error={displayError}
      helperText={displayError ? error : props.helperText}
      // variant={readOnly ? 'standard' : props.variant}
      // required={readOnly ? false : props.required}
      InputProps={{
        inputComponent: maskedInput,
        ...props.InputProps,
      }}
      inputProps={{
        maxLength,
        ...props.inputProps,
      }}
    />
  );
}

const MemoTextField = React.memo(TextField) as typeof TextField;

export default MemoTextField;
