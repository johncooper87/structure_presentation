import { useLocation } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';

import { history, store } from 'app';
import { getLayout } from 'hooks/useLayout';
import isCurrentPath from './isCurrentPath';
import useLeftbarMinimized from '../useLeftbarMinimized';
import styles from './styles.module.scss';

interface NavItemProps {
  icon?: ReactNode;
  text?: string | ReactNode;
  path: string;
  exact?: boolean;
  isMenuItem?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLLIElement>;
}

function NavItem({ icon = null, text = '', path, exact = false, isMenuItem, onClick }: NavItemProps, ref) {
  const location = useLocation();
  const selected = isCurrentPath(location.pathname, path, exact);

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement | HTMLLIElement>>(event => {
    history.push(path, {});
    if (getLayout(window.innerWidth) !== 'desktop') store.dispatch({ type: 'CLOSE_LEFTBAR' });
    onClick?.(event);
  }, [path]);

  const leftbarMinimized = useLeftbarMinimized();

  if (isMenuItem) {
    return <MenuItem ref={ref} onClick={handleClick}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={text} />
    </MenuItem>;
  }

  return (
    <ListItem className={styles.navItem} selected={selected} button onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      {!leftbarMinimized && <ListItemText primary={text} />}
    </ListItem>
  );
}

export default React.forwardRef(NavItem);
