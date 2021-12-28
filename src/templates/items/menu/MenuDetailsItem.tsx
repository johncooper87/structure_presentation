import React from 'react';
import DetailsIcon from '@material-ui/icons/Visibility';
import MenuItem from 'components/Menu/MenuItem';

// @ts-ignore
const MenuDetailsItem: typeof MenuItem = React.forwardRef((props, ref) => {
  return <MenuItem ref={ref} icon={<DetailsIcon />} text="Посмотреть" {...props} />;
});

export default React.memo(MenuDetailsItem);
