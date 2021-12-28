import {
  ListItem,
  MenuItem as MuiMenuItem,
  ListItemIcon,
  IconProps,
  ListItemText,
} from '@material-ui/core';

import { useLayout } from 'hooks';
import closeMenu from './closeMenu';
import templates from './templates';

export interface MenuItemProps {
  icon?: ReactElement<IconProps>;
  text?: string;
  onClick?: (event: React.MouseEvent, data: any) => void;
  data?: any;
  template?: keyof typeof templates;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  disableCloseOnClick?: boolean;
}

const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (
    { onClick, data, disabled, className, template, children, disableCloseOnClick, ...props },
    ref
  ) => {
    const { icon, text } = { ...templates[template], ...props };

    const layout = useLayout();

    const handleClick = useCallback(
      event => {
        if (onClick != null) onClick(event, data);
        if (!disableCloseOnClick) closeMenu();
      },
      [onClick, disableCloseOnClick, data]
    );

    children =
      children !== undefined
        ? children
        : [
            icon && <ListItemIcon key="icon">{icon}</ListItemIcon>,
            text && <ListItemText key="text">{text}</ListItemText>,
          ];

    if (layout === 'mobile')
      return (
        <ListItem button disabled={disabled} className={className} onClick={handleClick}>
          {children}
        </ListItem>
      );

    return (
      <MuiMenuItem disabled={disabled} ref={ref} className={className} onClick={handleClick}>
        {children}
      </MuiMenuItem>
    );
  }
);

export default React.memo(MenuItem);
