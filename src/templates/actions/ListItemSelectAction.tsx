import React from 'react';
import { Checkbox } from '@material-ui/core';
import { ListItemClickAction } from 'components';
// import { useMutableState } from 'hooks';

interface ListItemSelectActionProps {
  selected?: boolean;
  data?: any;
  onChange?: (
    event: React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    data: any
  ) => void;
}

// type ListItemSelectActionMutableState = {
//   selected: boolean;
// };

function ListItemSelectAction({ selected, onChange, data }: ListItemSelectActionProps) {
  // const recent = useMutableState<ListItemSelectActionMutableState>();
  // recent.selected = selected;
  const inputRef = useRef<HTMLInputElement>();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onChange != null) onChange(event, !inputRef.current.checked, data);
    },
    [onChange, data]
  );
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (onChange != null) onChange(event, checked, data);
    },
    [onChange, data]
  );

  return (
    <>
      <Checkbox inputRef={inputRef} checked={selected} onChange={handleChange} />
      <ListItemClickAction showOverlay={selected} onClick={handleClick} />
    </>
  );
}

export default React.memo(ListItemSelectAction);
