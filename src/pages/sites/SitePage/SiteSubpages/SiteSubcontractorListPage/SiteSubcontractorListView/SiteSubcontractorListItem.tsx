import { Grid, ListItem, ListItemText, Switch } from '@material-ui/core';
import { openDialog } from 'utils';

interface SiteSubcontractorListItemProps {
  data: Subcontractor;
}

function SiteSubcontractorListItem({ data }: SiteSubcontractorListItemProps) {
  const { displayName, isActive, id: enterpriseId } = data;

  const handleSwitchState = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      openDialog('SITES/SUBCONTRACTOR_STATUS', {
        enterpriseId,
        active: checked,
        name: displayName,
      });
    },
    [enterpriseId, displayName]
  );

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={2} md={1}>
          <Switch checked={isActive} onChange={handleSwitchState} />
        </Grid>
        <Grid item xs={10} md={11}>
          <ListItemText primary={displayName} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default SiteSubcontractorListItem;
