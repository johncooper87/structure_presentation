import { TextField, TextFieldProps } from 'components';

const passportMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

const passportMaskedInputProps = {
  mask: passportMask,
};

function PassportField(props: TextFieldProps) {
  return (
    <TextField
      name="passport"
      label="Пасспорт (серия и номер)"
      maskedInputProps={passportMaskedInputProps}
      {...props}
    />
  );
}

export default React.memo(PassportField);
