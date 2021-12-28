import { store } from 'app';

function useSelected<Key, Data>(key: Key, data: Data, multiple?: boolean): [boolean, () => void] {
  const selectSelector = useCallback(
    ({ select }: AppState) => select.selectedKeyList.includes(key),
    [key]
  );
  const selected = useSelector(selectSelector);

  const toggleSelected = useCallback(() => {
    store.dispatch({ type: 'TOGGLE_SELECTED', key, data, multiple });
  }, [key, data, multiple]);

  useEffect(() => {
    if (!selected) return;
    store.dispatch({ type: 'UPDATE_DATA', key, data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return [selected, toggleSelected];
}

export default useSelected;

const selectedDataSelector = ({ select }: AppState) => select.selectedDataList;
export function useSelectedData(clear = true) {
  useMemo(() => {
    if (clear) {
      const select = store.getState().select;
      select.selectedKeyList = [];
      select.selectedDataList = [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return useSelector(selectedDataSelector);
}

export function useClearSelected() {
  useLayoutEffect(() => {
    return () => {
      // store.dispatch({ type: 'DESELECT_ALL' });
      const select = store.getState().select;
      select.selectedKeyList = [];
      select.selectedDataList = [];
    };
  }, []);
}
