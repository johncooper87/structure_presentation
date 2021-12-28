import { ListItem, ListItemIcon, ListItemText, Collapse, List, Menu } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { history } from 'app';
import isReactElement from 'utils/isReactElement';
import isCurrentPath from './isCurrentPath';
import useLeftbarMinimized from '../useLeftbarMinimized';
import styles from './styles.module.scss';

interface ExpandableNavItemProps {
  icon?: ReactNode;
  text?: string | ReactNode;
  path: string;
  children: ReactNode;
}

function ExpandableNavItem({ icon = null, text = '', path, children }: ExpandableNavItemProps) {
  const [expanded, setExpanded] = useState(isCurrentPath(location.pathname, path));
  const [anchorEl, setAnchorEl] = useState<Element>(null);
  const toggleExpanded = useCallback(() => {
    setExpanded((_expanded) => !_expanded);
  }, []);

  useEffect(() => {
    const unregister = history.listen((location) => {
      if (isCurrentPath(location.pathname, path)) setExpanded(true);
      else setExpanded(false);
    });
    return unregister;
  }, [path]);

  const leftbarMinimized = useLeftbarMinimized();

  if (leftbarMinimized) {
    return (
      <>
        <ListItem
          className={styles.navItem}
          selected={expanded}
          button
          onClick={event => setAnchorEl(event.target as Element)}
        >
          <ListItemIcon>{icon}</ListItemIcon>
        </ListItem>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          {React.Children.map(children, child => {
            if (!isReactElement(child)) return null;
            return React.cloneElement(child, { isMenuItem: true, onClick: () => setAnchorEl(null) });
          })}
        </Menu>
      </>
    );
  }

  return (
    <>
      <ListItem className={styles.navItem} button onClick={toggleExpanded}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={expanded}>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}

export default ExpandableNavItem;
