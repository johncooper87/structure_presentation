import ReactDOM from 'react-dom';
import { Typography } from '@material-ui/core';

import useTopbarUpdater from 'hooks/useTopbarUpdater';
import { getPortalContainer } from 'utils/contents';

const topbarTitleContainer = getPortalContainer('topbar-title');

interface TopbarTitleProps {
  children: string | ReactNode;
}

function TopbarTitle({ children }: TopbarTitleProps) {
  useTopbarUpdater();

  // const content =
  //   typeof children === 'string' ? <Typography variant="h6">{children}</Typography> : children;
  const content = (
    <Typography variant="h6" style={{ marginRight: '12px' }}>
      {children}
    </Typography>
  );
  return ReactDOM.createPortal(content, topbarTitleContainer);
}

export default TopbarTitle;
