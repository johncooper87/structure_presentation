import React from 'react';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ToolbarItem from 'components/Toolbar/ToolbarItem';

const downloadIcon = <DownloadIcon />;

// @ts-ignore
const ToolbarDownloadItem: typeof ToolbarItem = React.forwardRef((props, ref) => {
  return <ToolbarItem ref={ref} icon={downloadIcon} text="Загрузить" {...props} />;
});

export default React.memo(ToolbarDownloadItem);
