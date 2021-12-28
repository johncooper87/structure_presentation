import React from 'react';
import { IconButton } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';

import { Menu } from 'components';
import { useMenuState } from 'hooks';
import { openMenu } from 'utils';
import ToolbarItemContext from './ToolbarItemContext';

const menuKey = 'TOOLBAR/MORE_ITEMS';
const showMoreItems = (event: React.MouseEvent) => openMenu(menuKey, event.currentTarget);

interface ToolbarMenuProps {
  children: ReactNode;
}

function ToolbarMenu({ children }: ToolbarMenuProps) {
  const { open } = useMenuState(menuKey);

  return (
    <ToolbarItemContext.Provider value={true}>
      <IconButton onClick={showMoreItems}>
        <MoreIcon />
      </IconButton>
      <Menu open={open}>{children}</Menu>
    </ToolbarItemContext.Provider>
  );
}

export default ToolbarMenu;
