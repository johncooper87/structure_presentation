import { TextField, TextFieldProps } from 'components';

const phoneNumberMask = [
  '+7 (',
  /\d/,
  /\d/,
  /\d/,
  ') ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

const phoneMaskedInputProps = {
  mask: phoneNumberMask,
};

function PhoneNumberField(props: TextFieldProps) {
  return (
    <TextField
      name="phoneNumber"
      label="Номер телефона"
      maskedInputProps={phoneMaskedInputProps}
      {...props}
    />
  );
}

export default React.memo(PhoneNumberField);
