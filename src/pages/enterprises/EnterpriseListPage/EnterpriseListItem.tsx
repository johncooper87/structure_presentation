import { Grid, ListItem, ListItemText, Tooltip } from '@material-ui/core';
import TotalSitesIcon from '@material-ui/icons/LocationOn';
import TotalWorkersIcon from '@material-ui/icons/People';
import AddressIcon from 'components/icons/TravelExplore';
import { openMenu } from 'utils';
import { ListItemMoreAction } from 'templates/actions';

function handleMoreAction(event: React.MouseEvent, enterprise: EnterpriseDTO) {
  openMenu('ENTERPRISES/ENTERPRISE_ITEM', event.currentTarget, enterprise);
}

interface EnterpriseListItemProps {
  data: Partial<EnterpriseDTO>;
}

function EnterpriseListItem({ data }: EnterpriseListItemProps) {
  const { enterprise, objCount, workerCount } = data;
  const { name, attributes } = enterprise;
  const { inn, addr } = attributes;

  const totalSitesAndWorkers = (
    <Grid container wrap="nowrap" alignItems="center" spacing={1}>
      <Grid item>
        <Tooltip title="Количество объектов">
          <span style={{ display: 'inherit' }}>
            <TotalSitesIcon />
          </span>
        </Tooltip>
      </Grid>
      <Grid item>
        <p>{objCount}</p>
      </Grid>
      <Grid item>
        <Tooltip title="Количество сотрудников">
          <span style={{ display: 'inherit' }}>
            <TotalWorkersIcon />
          </span>
        </Tooltip>
      </Grid>
      <Grid item>
        <p>{workerCount}</p>
      </Grid>
    </Grid>
  );

  const address = addr && (
    <Grid container wrap="nowrap" alignItems="flex-start" spacing={1}>
      <Grid item>
        <Tooltip title="Адрес">
          <span style={{ display: 'inherit' }}>
            <AddressIcon />
          </span>
        </Tooltip>
      </Grid>
      <Grid item>
        <p style={{ whiteSpace: 'unset' }}>{addr}</p>
      </Grid>
    </Grid>
  );

  return (
    <ListItem>
      <Grid container>
        <Grid item sm={5} xs={12}>
          <ListItemText primary={name} secondary={'ИНН ' + inn} />
        </Grid>
        <Grid item sm={7} xs={12} className="col-2">
          <ListItemText primary={address} secondary={totalSitesAndWorkers} />
        </Grid>
      </Grid>
      <ListItemMoreAction data={data} onClick={handleMoreAction} />
    </ListItem>
  );
}

export default EnterpriseListItem;
