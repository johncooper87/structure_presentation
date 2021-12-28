import React from 'react';
import { ButtonProps } from '@material-ui/core';
import { DialogButton } from 'components';
import { closeDialog } from 'utils';

function DialogCancelButton({ children, ...props }: ButtonProps) {
  return (
    <DialogButton variant="text" color="secondary" onClick={closeDialog} {...props}>
      {children ?? 'Отмена'}
    </DialogButton>
  );
}

export default React.memo(DialogCancelButton);
