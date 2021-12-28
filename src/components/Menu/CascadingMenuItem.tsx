import {
  ListItem,
  MenuItem,
  ListItemIcon,
  ListItemText,
  List,
  Collapse,
  Menu,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CascadingIcon from '@material-ui/icons/ArrowRight';

import useLayout from 'hooks/useLayout';
import { MenuItemProps } from './MenuItem';
import closeMenu from './closeMenu';
import templates from './templates';
import styles from './styles.module.scss';

interface CascadingMenuItemProps extends MenuItemProps {
  children: ReactNode;
}

const CascadingMenuItem = React.forwardRef<HTMLLIElement, CascadingMenuItemProps>(
  ({ children, template, ...props }, ref) => {
    const { icon, text } = { ...templates[template], ...props };

    const layout = useLayout();
    const menuKey = useSelector(({ layout: { menu } }: AppState) => menu.key, shallowEqual);

    const [anchor, setAnchor] = useState<HTMLElement>();
    const open = menuKey != null && Boolean(anchor);
    const handleClick = useCallback<React.MouseEventHandler<HTMLElement>>(event => {
      event.stopPropagation();
      setAnchor(_anchor => (_anchor != null ? null : event.currentTarget));
    }, []);
    const handleMenuClose = useCallback(() => {
      setAnchor(null);
      closeMenu();
    }, []);

    const cascadingIconRef = useRef<SVGSVGElement>();
    useLayoutEffect(() => {
      if (layout === 'mobile') return;
      const ulElement = cascadingIconRef.current.closest('ul');
      const paperEl: HTMLDivElement = cascadingIconRef.current.closest('.MuiMenu-paper');
      ulElement.style.setProperty('width', 'calc(100% + 24px)');
      paperEl.style.setProperty('padding-right', '24px');
      return () => {
        ulElement.style.removeProperty('width');
        paperEl.style.removeProperty('padding-right');
      };
    }, [layout]);

    const ExpandIcon = open ? ExpandLessIcon : ExpandMoreIcon;
    if (layout === 'mobile')
      return (
        <>
          <ListItem button onClick={handleClick}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            {text && <ListItemText>{text}</ListItemText>}
            <ExpandIcon className={styles.cascadingIcon} />
          </ListItem>
          <Collapse in={open}>
            <List className={styles.nestedList} component="div" disablePadding>
              {children}
            </List>
          </Collapse>
        </>
      );

    return (
      <MenuItem ref={ref} onClick={handleClick}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {text && <ListItemText>{text}</ListItemText>}
        <CascadingIcon ref={cascadingIconRef} className={styles.cascadingIcon} />
        <Menu open={open} anchorEl={anchor} onClose={handleMenuClose}>
          {children}
        </Menu>
      </MenuItem>
    );
  }
);

export default React.memo(CascadingMenuItem);
