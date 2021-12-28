import { Grid, ListItem, ListItemText, ListItemAvatar, Tooltip } from '@material-ui/core';
import MaleIcon from 'components/icons/Male';
import FemaleIcon from 'components/icons/Female';
import { openMenu } from 'utils';
import { ListItemMoreAction } from 'templates/actions';
import {
  ListItemEnterprise,
  ListItemConstructionSiteList,
  WorkerAvatar,
  ListItemDevice,
} from 'templates/data';
import styles from './styles.module.scss';

function handleMoreAction(event: React.MouseEvent, device: DeviceDTO) {
  openMenu('WORKERS/WORKER_ITEM', event.currentTarget, device);
}

interface WorkerListItemProps {
  data: Partial<WorkerDTO>;
}

function WorkerListItem({ data }: WorkerListItemProps) {
  const { id, fullName, device, enterprise, builds, profession, attributes } = data;
  const { photo, gender } = attributes;

  const male = gender === '0';
  const GenderIcon = male ? MaleIcon : FemaleIcon;
  const genderTitle = 'Пол: ' + (male ? 'мужской' : 'женский');

  const genderAndFullname = (
    <Grid container wrap="nowrap" alignItems="center">
      <Tooltip title={genderTitle}>
        <span style={{ display: 'inherit' }}>
          <GenderIcon />
        </span>
      </Tooltip>
      <p>{fullName}</p>
    </Grid>
  );

  return (
    <ListItem>
      <ListItemAvatar className={styles.workerAvatar}>
        <WorkerAvatar id={photo && id} />
      </ListItemAvatar>
      <Grid container>
        <Grid item sm={4} xs={12}>
          <ListItemText primary={genderAndFullname} secondary={<p>{profession?.displayName}</p>} />
        </Grid>
        <Grid item sm={3} xs={12} className="col-2">
          <ListItemText primary={<ListItemDevice data={device} />} />
        </Grid>
        <Grid item sm={5} xs={12} className="col-2">
          <ListItemText
            primary={<ListItemEnterprise data={enterprise} />}
            secondary={<ListItemConstructionSiteList data={builds} />}
          />
        </Grid>
      </Grid>
      <ListItemMoreAction data={data} onClick={handleMoreAction} />
    </ListItem>
  );
}

export default WorkerListItem;
