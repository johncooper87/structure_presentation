import { Box, Button, Grid, Typography } from '@material-ui/core';
import AddContactIcon from '@material-ui/icons/PersonAdd';
import { Switch, TextField } from 'components';
import { FieldArray } from 'components/Form';
import MapContainer from 'components/_Map';
import { useFieldValues } from 'hooks';
import useDebouncedHandler from 'hooks/useDebouncedHandler';
import { EnterpriseSelect } from 'templates';
import { http } from 'utils';
import ContactField from './ContactField';
import SigurCredentials from './SigurCredentials';
import TimeZoneSelect from './TimeZoneSelect';
import UserInforming from './UserInforming';

async function getAddressMarker(address: string) {
  if (!address) return;
  const encodedAddress = encodeURIComponent(address);
  const { result } = await http.get(`/api/geodata/location/by-address/${encodedAddress}`);
  if (!result) return undefined;
  return {
    id: 'address-marker',
    latlng: result?.reverse(),
  } as Marker;
}

function SiteInfoView() {
  const address = useFieldValues('address');

  const getAddressMarkerDebounced = useDebouncedHandler(getAddressMarker, 1000);
  const { data: addressMarker } = useQuery(['ADDRESS_LOCATION', address], () =>
    getAddressMarkerDebounced(address)
  );

  const { markers, bounds } = useMemo(
    () =>
      addressMarker
        ? {
            markers: [addressMarker],
            bounds: [addressMarker.latlng],
          }
        : {},
    [addressMarker]
  );

  return (
    <Box overflow="hidden" pl={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} container spacing={2} style={{ height: '100%' }}>
          <Grid item xs={12}>
            <TextField fullWidth name="name" label="Название" />
          </Grid>
          <Grid item xs={12}>
            <EnterpriseSelect fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline name="address" label="Адрес" />
          </Grid>
          <Grid item xs={12} container justifyContent="space-between" spacing={2} wrap="nowrap">
            <Grid item xs={6}>
              <TimeZoneSelect />
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <Switch name="archive" label="Архивный" />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MapContainer
              bounds={bounds}
              markers={markers}
              style={{ width: '100%', height: '100%', minHeight: '400px' }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} container direction="column" spacing={2}>

          <Grid item>
            <SigurCredentials />
          </Grid>

          <Grid item>
            <Typography style={{ fontWeight: 'bold' }}>Контакты</Typography>
          </Grid>
          <FieldArray name="contacts">
            {({ map, push, remove, length, readOnly }) => (
              <>
                {map(index => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid item key={index}>
                    <ContactField index={index} readOnly={readOnly} onDelete={() => remove(index)} />
                  </Grid>
                ))}
                <Grid item>
                  {!readOnly && length < 2 && (
                    <Button variant="outlined" onClick={() => push({})}>
                      <AddContactIcon className="leading-icon" />
                      Добавить контакт
                    </Button>
                  )}
                </Grid>
              </>
            )}
          </FieldArray>
          <Grid item>
            <UserInforming />
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}

export default SiteInfoView;
