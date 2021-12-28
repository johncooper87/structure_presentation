import { Grid, ListItem, ListItemText, Tooltip } from '@material-ui/core';
import AddressIcon from 'components/icons/TravelExplore';
import { openMenu } from 'utils';
import { ListItemEnterprise } from 'templates';
import { ListItemMoreAction } from 'templates/actions';

function handleMoreAction(event: React.MouseEvent, site: SiteDTO) {
  openMenu('SITES/SITE_ITEM', event.currentTarget, site);
}

interface SiteListItemProps {
  data: Partial<SiteDTO>;
}

function SiteListItem({ data }: SiteListItemProps) {
  const { name, parent, attributes } = data.zoneGroup;
  const enterpriseName = parent.name;
  const { addr } = attributes;

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
          <ListItemText primary={name} />
        </Grid>
        <Grid item sm={7} xs={12} className="col-2">
          <ListItemText
            primary={<ListItemEnterprise data={{ displayName: enterpriseName }} />}
            secondary={address}
          />
        </Grid>
      </Grid>
      <ListItemMoreAction data={data} onClick={handleMoreAction} />
    </ListItem>
  );
}

export default SiteListItem;
