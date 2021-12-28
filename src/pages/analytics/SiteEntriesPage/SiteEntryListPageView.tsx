import { Typography } from '@material-ui/core';
import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import SiteEntryListItem from './SiteEntryListItem';
import fetchPageSiteEntryList from './fetchPageSiteEntryList';

const SiteEntryListPageView = () => {
  const {
    page = 0,
    pageSize = 10,
    ...requestParams
  } = useQueryParams() as SiteEntriesPageQueryParams;
  const { data, isFetching, isLoading } = useQuery(
    ['ANALITICS/SITE_ENTRIES', requestParams],
    () => fetchPageSiteEntryList(requestParams),
    {
      enabled: Object.keys(requestParams).length > 0,
    }
  );

  const { entries, workerFullName, totalDurationInProjectString } = data || {};
  const siteEntryList = useMemo(() => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return entries?.slice(startIndex, endIndex);
  }, [entries, page, pageSize]);

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        {data && (
          <>
            <Typography component="p" variant="h4">
              {workerFullName}
            </Typography>
            <Typography component="p" variant="h6">
              Общая продолжительность: {totalDurationInProjectString}
            </Typography>
          </>
        )}
        <List>
          {siteEntryList?.map((siteEntryItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SiteEntryListItem key={index} data={siteEntryItem} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={entries?.length} />
    </>
  );
};

export default SiteEntryListPageView;
