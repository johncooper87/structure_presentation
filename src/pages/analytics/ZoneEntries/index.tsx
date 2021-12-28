import { CircularProgress, Overlay, Toolbar, ToolbarItem, TopbarTitle } from 'components';
import { useQueryParams } from 'hooks';
import { http, downloadFile } from 'utils';
import ZoneEntriesData from './ZoneEntriesData';
import ZoneEntriesSearchBar from './ZoneEntriesSearchBar';

function fetchZoneEntriesReport(params: ZoneEntriesReportParams) {
  return http.post('/api/kbi/analytic/workerzoneentriesreport', params);
}

const ZoneEntries = () => {
  const params: ZoneEntriesReportParams = useQueryParams();
  const { data, isFetching } = useQuery(
    ['ANALITICS/ZONE_ENTRIES', params],
    () => fetchZoneEntriesReport({ ...params }),
    {
      enabled: Object.keys(params).length > 0,
    }
  );

  const handleDownload = () => {
    try {
      const {enterpriseId, constructionId, workerId, zoneId, begin, end} = params;
      const _begin = new Date(begin).toISOString().slice(0, 10);
      const _end = new Date(end).toISOString().slice(0, 10);
      http.post('/api/kbi/analytic/workerzoneentriesreportexcel', 
      {
        enterpriseId, 
        constructionId, 
        workerId, 
        zoneId, 
        begin: _begin, 
        end: _end
      }, {})
      .then((file: File) => downloadFile(file, file.name));
      // eslint-disable-next-line no-empty
    } catch {}
    return false;
  };

  return (
    <>
      <TopbarTitle>Отчет по вхождению в зоны</TopbarTitle>
      <ZoneEntriesSearchBar />
      <Toolbar>
        <ToolbarItem template="filter" alwaysVisible />
        <ToolbarItem template="download" onClick={handleDownload} />
      </Toolbar>
      <Overlay display={isFetching}>
        <CircularProgress display={isFetching} />
        {data && <ZoneEntriesData data={data} />}
      </Overlay>
    </>
  );
};

export default ZoneEntries;
