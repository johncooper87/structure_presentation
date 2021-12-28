import React from 'react';
import { Menu as MuiMenu, MenuProps, Drawer, List } from '@material-ui/core';

import { useLayout, useMutableState } from 'hooks';
import closeMenu from './closeMenu';

const anchorSelector = ({ layout: { menu } }: AppState) => menu.anchorEl;
const nullSelector = () => null;

interface MenuMutableState {
  children?: ReactNode;
}

function Menu({ open, children, ...props }: MenuProps) {
  const layout = useLayout();
  const anchorEl = useSelector(open ? anchorSelector : nullSelector, shallowEqual);

  const current = useMutableState<MenuMutableState>();
  if (open) current.children = children;

  if (layout === 'mobile')
    return (
      <Drawer open={open} onClose={props.onClose || closeMenu} anchor="bottom">
        <List>{current.children}</List>
      </Drawer>
    );

  return (
    <MuiMenu open={open} anchorEl={anchorEl} onClose={closeMenu} {...props}>
      {current.children}
    </MuiMenu>
  );
}

export default Menu;
