import React from 'react';
import { Chip, Tooltip, Grid } from '@material-ui/core';
import ConstructionSiteIcon from '@material-ui/icons/LocationOn';
import styles from './styles.module.scss';

interface ConstructionSiteChipProps {
  data: ConstructionSite;
}

const constructionSiteIcon = (
  <Tooltip title="Объект">
    <ConstructionSiteIcon fontSize="small" />
  </Tooltip>
);

let ConstructionSiteChip = ({ data }: ConstructionSiteChipProps) => {
  if (data == null) return null;
  return <Chip className={styles.chip} icon={constructionSiteIcon} label={data.name} />;
};
ConstructionSiteChip = React.memo(ConstructionSiteChip);

interface ConstructionSiteListProps {
  data: ConstructionSite[];
}

function ListItemConstructionSiteList({ data }: ConstructionSiteListProps) {
  if (data == null) return null;
  return (
    <Grid container className={styles.chipList} wrap="wrap">
      {data?.map((site) => (
        <Grid item key={site.id}>
          <ConstructionSiteChip data={site} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ListItemConstructionSiteList;
