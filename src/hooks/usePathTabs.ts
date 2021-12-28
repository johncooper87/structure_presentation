import { matchPath, useLocation } from 'react-router-dom';
import { history } from 'app';
import { useFormPageMode } from 'hooks';

declare global {
  type TabChangeHandler = (event: React.ChangeEvent<{}>, value: any) => void;
}

function usePathTabs(path: string, exact?: boolean): [any, TabChangeHandler] {
  const { pathname } = useLocation();
  const formPageMode = useFormPageMode();
  const formPageModePathSuffix =
    formPageMode === 'create' || formPageMode === 'edit' ? '/' + formPageMode : '';

  const tab = useMemo(() => {
    const match = matchPath<{ tab: string }>(pathname, {
      path: path + '/:tab?' + formPageModePathSuffix,
      exact,
    });
    return match?.params.tab ?? '';
  }, [path, exact, pathname, formPageModePathSuffix]);

  const handleTabChange = useCallback<TabChangeHandler>(
    (event, value) => {
      const { state } = history.location;
      const tabPathSuffix = value ? '/' + value : '';
      history.replace(path + tabPathSuffix + formPageModePathSuffix, state);
    },
    [path, formPageModePathSuffix]
  );

  return [tab, handleTabChange];
}

export default usePathTabs;
