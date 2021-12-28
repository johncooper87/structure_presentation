interface UseMenuState<Data> {
  open: boolean;
  data?: Data;
  anchorEl?: Element;
}

function useMenuState<Data>(key?: string): UseMenuState<Data> {
  const menuSelector = useCallback(
    ({ layout: { menu } }: AppState) => (menu.key === key ? menu : { data: null, anchorEl: null }),
    [key]
  );
  const { data, anchorEl } = useSelector(menuSelector, shallowEqual);
  if (anchorEl == null) return { open: false };
  return {
    open: true,
    data,
    anchorEl,
  };
}

export default useMenuState;
