import { useField, fieldSubscription, shouldDisplayFieldError } from 'components/Form';
import MapContainer, { BaseMapProps } from 'components/_Map';
import { Typography } from '@material-ui/core';
import useDerivedFieldProps from '../useDerivedFieldProps';

type MapFielProps = BaseMapProps & {
  name: string;
  validate?: FieldValidator<FeatureGroup>;
  readOnly?: boolean;
  disabled?: boolean;
};

function MapField({
  name,
  validate,
  polygons,
  ...props
}: MapFielProps) {

  const { disabled, readOnly, ...derivedProps } = useDerivedFieldProps(props);

  const field = useField<FeatureGroup>(name, { validate, subscription: fieldSubscription });
  const { value, change, blur, error } = field;

  const _polygons = useMemo(
    () => (polygons ?? []).map(p => ({ ...p, fillOpacity: 0.1, opacity: 0.4 })),
    [polygons]
  );

  const _editableElements = useMemo(
    () => ({
      ...value,
      polygons: value?.polygons.map(p => ({ ...p, fillOpacity: 0.5, opacity: 0.9 })),
    }),
    [value]
  );

  const displayError = shouldDisplayFieldError(field);

  return (
    <>
      <MapContainer
        {...derivedProps}
        disabled={disabled}
        polygons={_polygons}
        editableElements={_editableElements}
        onEditableElementsChange={change}
        onBlur={blur}
      />
      {displayError && (
        <Typography color="error" style={{ fontSize: '14px' }}>
          {error}
        </Typography>
      )}
    </>
  );
}

export default MapField;
