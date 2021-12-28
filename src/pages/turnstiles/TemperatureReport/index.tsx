import { CircularProgress, Overlay, Toolbar, ToolbarItem, TopbarTitle } from 'components';
import { useQueryParams } from 'hooks';
import { http } from 'utils';
import downloadFile from 'utils/downloadFile';
import styles from './styles.module.scss';
import TemperatureReportTable from './TemperatureReportTable';
import TemperatureSearchBar from './TemperatureSearchBar';

async function fetchTemperatureReportData({ constructionId, start, end }: TemperatureReportParams) {
  const begin = new Date(start).toISOString().slice(0, 10);
  const _end = new Date(end).toISOString().slice(0, 10);
  const result = await http.post('/api/kbi/analytic/temperaturereport', {
    constructionId,
    begin,
    end: begin === _end ? undefined : _end,
  });
  return result as TemperatureReportData;
}

function TemperatureReport() {
  const params: TemperatureReportParams = useQueryParams();

  const { data = [], isFetched, isLoading } = useQuery(
    ['ANALITICS/TEMPERATURE_REPORT', params],
    () => fetchTemperatureReportData(params as TemperatureReportParams),
    {
      keepPreviousData: false,
      cacheTime: 0,
      enabled: Boolean(params.constructionId) && Boolean(params.start) && Boolean(params.end),
    }
  );
  const handleDownload = () => {
    try {
      const { start, end, constructionId } = params;
      const begin = new Date(start).toISOString().slice(0, 10);
      const _end = new Date(end).toISOString().slice(0, 10);
      http
        .post(
          '/api/kbi/analytic/temperaturereportexcel',
          {
            constructionId,
            begin,
            end: begin === _end ? undefined : _end,
          },
          {}
        )
        .then((file: File) => downloadFile(file, file.name));
      // eslint-disable-next-line no-empty
    } catch {}
    return false;
  };

  return (
    <>
      <TopbarTitle>Отчет по температурам</TopbarTitle>
      <Toolbar>
        <ToolbarItem template="filter" alwaysVisible />
        <ToolbarItem template="download" onClick={handleDownload} />
      </Toolbar>

      <TemperatureSearchBar />

      <Overlay display={isLoading}>
        <CircularProgress display={isLoading} />
        {isFetched && data && (
          <>
            <div className={styles.tableContainer}>
              <TemperatureReportTable data={data} />
            </div>
          </>
        )}
      </Overlay>
    </>
  );
}

export default TemperatureReport;
