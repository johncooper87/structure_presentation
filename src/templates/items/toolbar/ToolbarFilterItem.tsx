import React from 'react';
import FilterIcon from '@material-ui/icons/FilterList';

import ToolbarItem from 'components/Toolbar/ToolbarItem';
import { store } from 'app';
import { useLayout } from 'hooks';

const toggleRightBar = () => {
  store.dispatch({ type: 'TOGGLE_RIGHTBAR' });
};

const filterIcon = <FilterIcon />;

// @ts-ignore
const ToolbarFilterItem: typeof ToolbarItem = React.forwardRef((props, ref) => {
  const layout = useLayout();
  if (layout === 'desktop') return null;
  return (
    <ToolbarItem ref={ref} onClick={toggleRightBar} icon={filterIcon} text="Фильтры" {...props} />
  );
});

export default React.memo(ToolbarFilterItem);
