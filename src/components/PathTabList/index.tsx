import { matchPath, useLocation } from 'react-router-dom';
import { Tabs, TabsProps, Box } from '@material-ui/core';
import { history } from 'app';
import { useFormPageMode } from 'hooks';

interface PathTabListProps extends TabsProps {
  path: string;
  exact?: boolean;
}

function PathTabList({ path, exact, children, ...props }: PathTabListProps) {
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

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: string) => {
      const tabPathSuffix = value ? '/' + value : '';
      history.replace(path + tabPathSuffix + formPageModePathSuffix);
    },
    [path, formPageModePathSuffix]
  );

  return (
    <Box width="100%">
      <Tabs value={tab} onChange={handleChange} {...props}>
        {children}
      </Tabs>
    </Box>
  );
}

export default PathTabList;
