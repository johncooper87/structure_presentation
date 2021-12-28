import React from 'react';
import ReactDOM from 'react-dom';
import { Tooltip, IconButton, Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { store } from 'app';
import { useQueryParams } from 'hooks';
import useTopbarUpdater from 'hooks/useTopbarUpdater';
import { updateQueryParams } from 'utils';
import { getPortalContainer } from 'utils/contents';
import useDebouncedHandler from 'hooks/useDebouncedHandler';
import styles from './styles.module.scss';

const topbarSearchContainer = getPortalContainer('topbar-search');

const searchFieldSelector = ({ layout }: AppState) => layout.topbarSearchExpanded;

type QyeryParams = {
  search?: string;
};

function TopbarSearch() {
  const { search: searchParam = '' }: QyeryParams = useQueryParams();
  const [value, setValue] = useState(searchParam);

  useMemo(() => setValue(searchParam), [searchParam]);

  const setSearchParamDebounced = useDebouncedHandler(
    (search: string) => updateQueryParams({ search }),
    1000
  );

  const inputRef = useRef<HTMLInputElement>();
  const expanded = useSelector(searchFieldSelector, shallowEqual);

  const expand = useCallback(() => {
    store.dispatch({ type: 'EXPAND_TOPBAR_SEARCH' });
    inputRef.current.focus();
  }, []);
  const clear = useCallback(() => {
    setValue('');
    setSearchParamDebounced('');
    inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValue(value);
      setSearchParamDebounced(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onBlur = useCallback(event => {
    if (!event.target.value) store.dispatch({ type: 'COLLAPSE_TOPBAR_SEARCH' });
  }, []);

  const startAdornment = expanded && (
    <InputAdornment position="start">
      <SearchIcon color="action" />
    </InputAdornment>
  );

  const endAdornment =
    (!expanded && (
      <Tooltip title="Поиск">
        <IconButton onClick={expand}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    )) ||
    (value && (
      <Tooltip title="Очистить">
        <IconButton onClick={clear}>
          <ClearIcon />
        </IconButton>
      </Tooltip>
    ));

  const content = (
    <Input
      inputRef={inputRef}
      className={!expanded ? styles.searchInputCollapsed : styles.searchInputExpanded}
      startAdornment={startAdornment}
      endAdornment={endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );

  return ReactDOM.createPortal(content, topbarSearchContainer);
}

function _TopbarSearch() {
  useTopbarUpdater();
  return <TopbarSearch />;
}

export default _TopbarSearch;
