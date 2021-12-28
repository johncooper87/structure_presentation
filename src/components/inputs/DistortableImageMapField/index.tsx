import { useField, fieldSubscription, shouldDisplayFieldError } from 'components/Form';
import MapContainer, { BaseMapProps } from 'components/_Map';
import { Typography } from '@material-ui/core';
import useDerivedFieldProps from '../useDerivedFieldProps';

type DistortableImageMapFieldProps = BaseMapProps & {
  name: string;
  validate?: FieldValidator<[LatLng, LatLng, LatLng, LatLng]>;
  readOnly?: boolean;
  disabled?: boolean;
};

function DistortableImageMapField({
  name,
  validate,
  polygons,
  ...props
}: DistortableImageMapFieldProps) {

  const { disabled, readOnly, ...derivedProps } = useDerivedFieldProps(props);

  const field = useField<[LatLng, LatLng, LatLng, LatLng]>(name, { validate, subscription: fieldSubscription });
  const { value, change, blur, error } = field;

  const displayError = shouldDisplayFieldError(field);

  return (
    <>
      <MapContainer
        {...derivedProps}
        corners={value ?? undefined}
        onDistortImage={change}
        onBlur={blur}
        editableImage={!readOnly}
        polygons={polygons}
      />
      {displayError && (
        <Typography color="error" style={{ fontSize: '14px' }}>
          {error}
        </Typography>
      )}
    </>
  );
}

export default DistortableImageMapField;
