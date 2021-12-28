import { TopbarTitle, TopbarSearch, Toolbar, ToolbarItem } from 'components';
import useTotalAlerts from 'hooks/useTotalAlerts';
import { refetchActiveQuery } from 'utils';

const refresh = () => refetchActiveQuery('ALERTS/ALERT_LIST');

function AlertListToolbar() {
  const { today } = useTotalAlerts();
  const todayAlerts =
    today === undefined
      ? null
      : today === 0
      ? ', сегодня тревог не было'
      : ', всего за сегодня ' + today;
  return (
    <>
      <TopbarTitle>
        Журнал тревог
        {todayAlerts}
      </TopbarTitle>
      <TopbarSearch />
      <Toolbar>
        <ToolbarItem template="filter" />
        <ToolbarItem template="refresh" onClick={refresh} />
      </Toolbar>
    </>
  );
}

export default AlertListToolbar;
