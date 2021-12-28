import { Overlay, CircularProgress, TopbarProgress, QueryPaginator } from 'components';
import { useQueryParams } from 'hooks';
import fetchT12ReportData from './fetchT12ReportData';

import T12Table from './T12Table';

const T12ReportPageView = () => {
  const {
    page,
    pageSize,
    view = 'standart',
    ...requestParams
  } = useQueryParams() as T12ReportPageQueryParams;

  const { data, isFetching, isLoading } = useQuery(
    ['ANALITICS/T12REPORT', requestParams],
    () => fetchT12ReportData(requestParams),
    {
      enabled: Object.keys(requestParams).length > 0,
    }
  );

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        <T12Table data={data} page={page} pageSize={pageSize} view={view} />
        <div>
          <QueryPaginator total={data?.length} />
        </div>
      </Overlay>
    </>
  );
};

export default T12ReportPageView;
