import ChartIcon from '@material-ui/icons/PieChart';
import TableIcon from '@material-ui/icons/ViewList';
import {
  BarTab,
  BarTabs,
  CircularProgress,
  Overlay,
  Toolbar,
  ToolbarItem,
  TopbarSearch,
  TopbarTitle,
} from 'components';
import { useQueryParams } from 'hooks';
import { http } from 'utils';
import SiteAnalyticsForPeriod from './SiteAnalyticsForPeriod';
import SiteAnalyticsPerDay from './SiteAnalyticsPerDay';
import SiteAnalyticsSearchBar from './SiteAnalyticsSearchBar';
import SiteAnalyticsTable from './SiteAnalyticsTable';
import styles from './styles.module.scss';

// import mockData from './mockData';

async function fetchSiteAnalyticsData({
  variant,
  constructionId,
  date,
  start,
  end,
}: SiteAnalyticsParams): Promise<SiteAnalyticsData> {
  if (variant === 'perday') {
    const result: SiteAnalyticsDataPerDay = await http.post('/api/kbi/analytic/sigurobjectperday', {
      constructionId,
      begin: date,
    });
    const bySortedDepartment = result.byDepartment;
    // const bySortedDepartment = result.byDepartment.sort(
    //   (a, b) => ((a.count + (a.nestedCount ?? 0)) >= (b.count + (b.nestedCount ?? 0)) ? -1 : 1)
    // );
    const bySortedPosition = result.byPosition;
    // const bySortedPosition = result.byPosition.sort((a, b) => (a.count >= b.count ? -1 : 1));
    // const nameNotDefinedIndex = bySortedPosition.findIndex(item => item.name === '');
    // if (nameNotDefinedIndex !== -1) {
    //   bySortedPosition[nameNotDefinedIndex].name = 'Не указана';
    //   const nameNotDefinedItem = bySortedPosition.splice(nameNotDefinedIndex, 1);
    //   bySortedPosition.push(nameNotDefinedItem[0]);
    // }
    return {
      ...result,
      byDepartment: bySortedDepartment,
      byPosition: bySortedPosition,
    };
  }

  if (variant === 'forperiod') {
    const result: SiteAnalyticsDataForPeriod = await http.post(
      '/api/kbi/analytic/sigurobjectperiod',
      {
        constructionId,
        begin: start,
        end,
      }
    );
    return result;
  }

  return undefined;
  // return variant === 'perday' ? mockData.perDay : mockData.forPeriod;
}

function SiteAnalytics() {
  const params: SiteAnalyticsParams = useQueryParams();
  const { variant } = params;

  const {
    data = {} as SiteAnalyticsData,
    isFetched,
    isLoading,
  } = useQuery(
    ['ANALITICS/SITE_ANALYTICS/' + variant, params],
    () => fetchSiteAnalyticsData(params),
    {
      keepPreviousData: false,
      cacheTime: 0,
      enabled:
        Boolean(params.constructionId) &&
        (variant === 'perday'
          ? Boolean(params.date)
          : Boolean(params.start) && Boolean(params.end)),
    }
  );

  const [tab, handleTabChange] = useState('summary');

  return (
    <>
      <TopbarTitle>Аналитика по объекту</TopbarTitle>
      <Toolbar>
        <ToolbarItem template="filter" alwaysVisible />
        <TopbarSearch />
      </Toolbar>

      <BarTabs value={tab} onChange={(event, value) => handleTabChange(value)}>
        <BarTab value="summary" label="Сводные данные" icon={<ChartIcon />} />
        <BarTab value="all" label="Все данные" icon={<TableIcon />} />
      </BarTabs>

      <SiteAnalyticsSearchBar />

      <Overlay display={isLoading}>
        <CircularProgress display={isLoading} />
        {isFetched && data && (
          <>
            {tab === 'summary' && (
              <>
                {variant === 'perday' && (
                  <SiteAnalyticsPerDay data={data as SiteAnalyticsDataPerDay} />
                )}
                {variant === 'forperiod' && (
                  <SiteAnalyticsForPeriod data={data as SiteAnalyticsDataForPeriod} />
                )}
              </>
            )}

            {tab === 'all' && (
              <div className={styles.tableContainer}>
                <SiteAnalyticsTable
                  data={data?.entries ?? []}
                  // params={params}
                />
              </div>
            )}
          </>
        )}
      </Overlay>
    </>
  );
}

export default SiteAnalytics;

// import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
/* <div className={styles.header}>
        <div>
          <ToggleButtonGroup exclusive size="small" value={variant} onChange={handleVariantChange}>
            <ToggleButton value="PER_DAY">За день</ToggleButton>
            <ToggleButton value="FOR_PERIOD">За период</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div> */
