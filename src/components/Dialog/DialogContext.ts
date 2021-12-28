interface DialogContextValue {
  open: boolean;
  disabled: boolean;
}

export const DialogContext = React.createContext<DialogContextValue>(null);

export function useDialogContext(): DialogContextValue {
  const value = React.useContext(DialogContext);
  return value;
}
