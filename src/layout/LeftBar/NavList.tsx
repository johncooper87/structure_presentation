import { List } from '@material-ui/core';
import EnterpriseIcon from '@material-ui/icons/Business';
import BeaconsIcon from '@material-ui/icons/Contactless';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import ConstructionSiteIcon from '@material-ui/icons/LocationOn';
import WorkersIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import DevicesIcon from '@material-ui/icons/SettingsRemote';
import AnaliticsIcon from 'components/icons/Analitics';
import TurnstilesIcon from 'components/icons/Login';
import { useRole } from 'hooks';
import React from 'react';
import UserRoles from 'utils/UserRoles';
import AlertsNavItem from './AlertsNavItem';
import { ExpandableNavItem, NavItem } from './NavItem';
import { fetchPageSiteList } from './queries';

function NavList() {
  const role = useRole();
  const [isSigurUser, setIsSigurUser] = useState<boolean>(true);

  const { data: siteList } = useQuery('NAV_BAR/SITE_LIST', fetchPageSiteList, { staleTime: 0 });

  useEffect(() => {
    if (!isSigurUser) {
      setIsSigurUser(true);
    }
    for (let i = 0; i < siteList?.length; i++) {
      if (siteList?.[i]?.zoneGroup?.attributes?.sigurObject !== 'True') {
        setIsSigurUser(false);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteList]);

  const isAdminNavItemVisible =
    role === UserRoles.ADMIN ||
    role === UserRoles.DEV ||
    role === UserRoles.TEMPADMIN ||
    role === UserRoles.ENT_MANAGER;

  return (
    <>
      <List>
        <NavItem icon={<DashboardIcon />} text="Диспетчерский пункт" path="/" exact />
        <NavItem icon={<EnterpriseIcon />} text="Компании" path="/enterprises" />
        <NavItem icon={<ConstructionSiteIcon />} text="Объекты" path="/sites" />
        {!isSigurUser && <NavItem icon={<WorkersIcon />} text="Сотрудники" path="/workers" />}
        {!isSigurUser && <NavItem icon={<DevicesIcon />} text="Устройства" path="/devices" />}
        {!isSigurUser && <NavItem icon={<BeaconsIcon />} text="Маяки" path="/beacons" />}
        <ExpandableNavItem icon={<TurnstilesIcon />} text="Турникеты" path="/turnstiles">
          <NavItem text="Отчет по температурам" path="/turnstiles/temperature-report" />
          <NavItem text="Аналитика по объекту" path="/turnstiles/site-analytics" />
          {isSigurUser && <NavItem text="Форма Т12" path="/analytics/t12report" />}
        </ExpandableNavItem>
      </List>
      <List>
        {!isSigurUser && (
          <ExpandableNavItem icon={<AnaliticsIcon />} text="Аналитика и отчеты" path="/analytics">
            <NavItem text="Учёт рабочего времени" path="/analytics/work-time" />
            <NavItem text="Форма Т12" path="/analytics/t12report" />
            <NavItem text="Отчёт по вхождению на объекты" path="/analytics/site-entries" />
            <NavItem text="Отчёт по вхождению в зоны" path="/analytics/zone-entries" />
          </ExpandableNavItem>
        )}
        {!isSigurUser && (
          <ExpandableNavItem icon={<HistoryIcon />} text="Журнал событий" path="/event-log">
            <NavItem text="Оперативные данные" path="/event-log/recent-data" />
            <NavItem text="История событий" path="/event-log/history" />
          </ExpandableNavItem>
        )}
      </List>
      <List>
        {isAdminNavItemVisible && (
          <ExpandableNavItem icon={<SettingsIcon />} text="Администрирование" path="/admin">
            <NavItem text="Пользователи" path="/admin/users" />
            <NavItem text="Уведомление сотрудников" path="/admin/worker-notification" />
            {/* <NavItem text="Журнал биометрии" path="/admin/biometry" /> */}
          </ExpandableNavItem>
        )}
        {!isSigurUser && <AlertsNavItem />}
      </List>
    </>
  );
}

export default NavList;
