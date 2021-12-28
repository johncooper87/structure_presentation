interface UseDialogState<Data> {
  open: boolean;
  data?: Data;
}

function useDialogState<Data>(key?: string): UseDialogState<Data> {
  const dialogSelector = useCallback(
    ({ layout: { dialog } }: AppState) => (dialog.key === key ? dialog.data : null),
    [key]
  );
  const data = useSelector(dialogSelector, shallowEqual);
  if (data == null) return { open: false };
  return {
    open: true,
    data,
  };
}

export default useDialogState;
