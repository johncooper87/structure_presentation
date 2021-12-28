import React from 'react';
import { IconButton } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ListItemClickAction } from 'components';

interface ListItemMoreActionProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: any) => void;
  data?: any;
}

function ListItemMoreAction({ onClick, data }: ListItemMoreActionProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick != null) onClick(event, data);
    },
    [onClick, data]
  );

  return (
    <ListItemClickAction onClick={handleClick}>
      <IconButton>
        <MoreIcon />
      </IconButton>
    </ListItemClickAction>
  );
}

export default React.memo(ListItemMoreAction);
