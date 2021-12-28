import {
  Menu,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  List,
  Divider,
  ListItemAvatar,
  ListItemSecondaryAction,
  Box,
} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CreateIcon from '@material-ui/icons/Create';
import LogOutIcon from '@material-ui/icons/ExitToApp';

import { history, store } from 'app';
import { classes } from 'utils';
import useLeftbarMinimized from './useLeftbarMinimized';
import styles from './styles.module.scss';

function Profile() {
  const user = useSelector((state: AppState) => state.auth);
  const leftbarMinimized = useLeftbarMinimized();

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileMenu = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);
  const closeProfileMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const startEditProfile = useCallback(() => {
    setAnchorEl(null);
    const user = store.getState().auth;
    if (user?.id) history.push(`/admin/users/${user?.id}`);
  }, []);
  const logout = useCallback(() => {
    setAnchorEl(null);
    store.dispatch({ type: 'SIGNOUT' });
    localStorage.removeItem('user');
  }, []);

  if (!user) return null;
  const { name, login, enterprise, role, phone, eMail } = user;

  if (leftbarMinimized) return (<span className={styles.profile}>
    <List>
      <ListItem disableGutters>
        <ListItemAvatar>
          <AccountIcon className={classes(styles.avatarIcon, styles.avatarIconMinimized)} />
        </ListItemAvatar>
      </ListItem>
      <Divider className={styles.divider} />
    </List>
  </span>);

  return (
    <span className={styles.profile}>
      <List className={styles.info}>
        <ListItem>
          <ListItemAvatar>
            <AccountIcon className={styles.avatarIcon} />
          </ListItemAvatar>
        </ListItem>
        <ListItem>
          <ListItemText className={styles.text} primary={name} secondary={eMail} />
          <ListItemSecondaryAction>
            <IconButton onClick={openProfileMenu} color="inherit">
              <ArrowDropDownIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider className={styles.divider} />
      </List>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeProfileMenu}>
        <MenuItem onClick={startEditProfile}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>
        <Divider />
        <List>
          {name && <ListItem>{name}</ListItem>}
          {login && <ListItem>{login}</ListItem>}
          {enterprise && <ListItem>{enterprise.name}</ListItem>}
          {role && <ListItem>{role.name}</ListItem>}
          {phone && <ListItem>{phone}</ListItem>}
          {eMail && <ListItem>{eMail}</ListItem>}
        </List>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon className={styles.logoutIcon}>
            <LogOutIcon />
          </ListItemIcon>
          <ListItemText>Выйти</ListItemText>
        </MenuItem>
      </Menu>
    </span>
  );
}

export default Profile;
