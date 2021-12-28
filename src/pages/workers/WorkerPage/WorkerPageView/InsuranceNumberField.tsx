import { TextField, TextFieldProps } from 'components';

const insuranceMask = [
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

const insuranceMaskedInputProps = {
  mask: insuranceMask,
};

function InsuranceNumberField(props: TextFieldProps) {
  return (
    <TextField
      name="insuranceNumber"
      label="Страховой номер"
      maskedInputProps={insuranceMaskedInputProps}
      {...props}
    />
  );
}

export default React.memo(InsuranceNumberField);
