import { InputAdornment } from '@material-ui/core';
import { TextField, TextFieldProps } from 'components';
import { useFieldValues } from 'hooks';
import { getDeviceTypePrefix } from '../../helpers';

const textFieldProps = {
  watch: {
    maxLength: 15,
    InputProps: {
      startAdornment: (
        <InputAdornment className="adornment-mask" position="start">
          {getDeviceTypePrefix('watch')}
        </InputAdornment>
      ),
    },
  },
  card: {
    maxLength: 16,
    InputProps: {
      startAdornment: (
        <InputAdornment className="adornment-mask" position="start">
          {getDeviceTypePrefix('card')}
        </InputAdornment>
      ),
    },
  },
};

function DeviceSerialNumberField(props: TextFieldProps) {
  const deviceTypeFieldValue: DeviceType = useFieldValues('type');
  return (
    <TextField
      name="serialNumber"
      type="number"
      label="Серийный номер"
      required
      {...textFieldProps[deviceTypeFieldValue]}
      {...props}
    />
  );
}

export default React.memo(DeviceSerialNumberField);
