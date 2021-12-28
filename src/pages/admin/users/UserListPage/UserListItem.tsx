import { Grid, ListItem, ListItemText, ListItemAvatar, Tooltip } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { openMenu } from 'utils';
import { ListItemMoreAction } from 'templates/actions';
import { ListItemEnterprise, UserAvatar } from 'templates/data';
import styles from './styles.module.scss';

function handleMoreAction(event: React.MouseEvent, user) {
  openMenu('USERS/USER_ITEM', event.currentTarget, user);
}

const blockIcon = (
  <Tooltip title="Заблокирован">
    <BlockIcon fontSize="small" className="alert" />
  </Tooltip>
);

interface UserListItemProps {
  data: Partial<UserListItemDTO>;
}

function UserListItem({ data }: UserListItemProps) {
  const { id, fullName, isBanned, login, positionName, enterpriseName } = data;

  const blockStatus = isBanned ? blockIcon : null;

  return (
    <ListItem>
      <ListItemAvatar className={styles.userAvatar}>
        <UserAvatar id={id} />
      </ListItemAvatar>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <ListItemText
            primary={
              <Grid container alignItems="flex-start" spacing={1} wrap="nowrap">
                <Grid item>{login}</Grid>
                <Grid item>{blockStatus}</Grid>
              </Grid>
            }
            secondary={<p>{positionName}</p>}
          />
        </Grid>
        <Grid item sm={6} xs={12} className="col-2">
          <ListItemText
            primary={<p>{fullName}</p>}
            secondary={
              enterpriseName && <ListItemEnterprise data={{ displayName: enterpriseName }} />
            }
          />
        </Grid>
      </Grid>
      <ListItemMoreAction data={data} onClick={handleMoreAction} />
    </ListItem>
  );
}

export default UserListItem;
