import { Typography } from '@material-ui/core';
import { http } from 'utils';
import styles from './styles.module.scss';

type SiteMonitoringData = Partial<{
  alertGroupZoneTodayCount: number;
  deviceAssignCount: number;
  machineryGroupZoneNowCount: number;
  subContractorGroupZoneTodayCount: number;
  workerGroupZoneNowCount: number;
  workerGroupZoneTodayCount: number;
  workerShiftLessTenCount: number;
}>;

async function fetchSiteMonitoringData(siteId: string) {
  const { result } = await http.get('/api/kbi/dashboards/monitoringproject', {
    zoneGroupId: siteId,
  });

  // fragment for debugging

  return result as SiteMonitoringData;
}

function SiteMonitorWidget({ siteId }: { siteId?: string }) {
  const { data = {} } = useQuery(
    ['WIDGETS/SITE_MONITORING', siteId],
    () => fetchSiteMonitoringData(siteId),
    {
      enabled: Boolean(siteId),
      refetchInterval: 10000,
    }
  );

  return (
    <div className={styles.siteMonitoring}>
      <Typography component="div">
        Зарегистрировано:
        <span>{data?.workerGroupZoneTodayCount}</span>
      </Typography>
      <Typography component="div">
        Количество сотрудников на объекте:
        <span>{data?.workerGroupZoneNowCount}</span>
      </Typography>
      <Typography component="div">
        Количество техники на объекте:
        <span>{data?.machineryGroupZoneNowCount}</span>
      </Typography>
      <Typography component="div">
        Тревоги:
        <span>{data?.alertGroupZoneTodayCount}</span>
      </Typography>
      <Typography component="div">
        Субподрядные организации:
        <span>{data?.subContractorGroupZoneTodayCount}</span>
      </Typography>
      <Typography component="div">
        Выданные устройства:
        <span>{data?.deviceAssignCount}</span>
      </Typography>
      <Typography component="div">
        Кол-во сотрудников с длительностью смены 10 минут и менее:
        <span>{data?.workerShiftLessTenCount}</span>
      </Typography>
    </div>
  );
}

export default SiteMonitorWidget;
