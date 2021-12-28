import { Dialog as MuiDialog, DialogProps as MuiDialogProps } from '@material-ui/core';
import { useMutableState } from 'hooks';
import { closeDialog } from 'utils';
import { DialogContext } from './DialogContext';

interface DialogMutableState {
  children?: ReactNode;
}

interface DialogProps extends MuiDialogProps {
  disabled?: boolean;
}

function Dialog({ open, disabled, children, ...props }: DialogProps) {
  const current = useMutableState<DialogMutableState>();
  if (open) current.children = children;
  const contextValue = useMemo(
    () => ({ open: Boolean(open), disabled: Boolean(disabled) }),
    [disabled, open]
  );

  return (
    <MuiDialog open={open} onClose={disabled ? undefined : closeDialog} {...props}>
      <DialogContext.Provider value={contextValue}>{current.children}</DialogContext.Provider>
    </MuiDialog>
  );
}

export default Dialog;
