import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from 'components/Menu/MenuItem';

// @ts-ignore
const MenuDeleteItem: typeof MenuItem = React.forwardRef((props, ref) => {
  return <MenuItem ref={ref} icon={<DeleteIcon />} text="Удалить" {...props} />;
});

export default React.memo(MenuDeleteItem);
