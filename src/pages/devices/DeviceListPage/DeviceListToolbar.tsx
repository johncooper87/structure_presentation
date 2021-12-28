import SelectIcon from 'components/icons/CheckListRtl';
import DetachIcon from 'components/icons/GroupOff';
import { store } from 'app';
import { routeToCreatePage } from 'actions';
import { TopbarTitle, Toolbar, ToolbarItem, TopbarSearch, Fab } from 'components';
import { downloadFile, createCSV, getQueryParams, openDialog } from 'utils';
import fetchPageDeviceList from '../queries/fetchPageDeviceList';

function startSelectingDevices() {
  store.dispatch({ type: 'UPDATE_SELECTED_DEVICES' });
}
function clearSelectedDevices() {
  store.dispatch({ type: 'CLEAR_SELECTED_DEVICES' });
}
const handleBatchDetach = () =>
  openDialog('DEVICES/DETACH', store.getState().deviceListPage.selectedDevices);

const DeviceListToolbarSelector = ({ deviceListPage }: AppState) => deviceListPage.selectedDevices;

const selectIcon = <SelectIcon />;
const detachIcon = <DetachIcon />;

async function fetchDeviceTableData() {
  const { page, pageSize, ...params }: DeviceListPageQueryParams = getQueryParams();
  const devices = await fetchPageDeviceList({
    ...params,
    page: 0,
    pageSize: 999999999,
  });

  const head = ['Серийный номер', 'Тип', 'Сотрудник', 'Компания', 'Объекты', 'Статус'];

  const body = devices.data.map(device => {
    const { gpsAddr, model, enterprise, worker, constructionSites, attributes } = device;
    const { displayName: deviceType } = model ?? {};
    const { displayName: enterpriseName } = enterprise ?? {};
    const { fullName: workerName } = worker ?? {};
    const { status } = attributes;
    return [
      gpsAddr,
      deviceType,
      workerName ?? '',
      enterpriseName ?? '',
      constructionSites?.map(cs => cs.name).join(', ') ?? '',
      status === 'False' || status === 'false' ? 'Архивное' : 'Активное',
    ];
  });

  return { head, body };
}

async function handleDownload() {
  const { head, body } = await fetchDeviceTableData();
  const csvData = createCSV(head, body);
  downloadFile(new Blob([csvData], { type: 'text/csv' }), 'Устройства.csv');
}

async function handlePrint() {
  const { head, body } = await fetchDeviceTableData();
  store.dispatch({ type: 'SET_PRINT_DATA', head, body });
  print();
}

function DeviceListToolbar() {
  const selectedDevices = useSelector(DeviceListToolbarSelector, shallowEqual);
  const selectionMode = selectedDevices !== null;

  const titleText = selectionMode ? `Выбрано устройств: ${selectedDevices.length}` : 'Устройства';

  const toolbar = !selectionMode ? (
    <Toolbar>
      <ToolbarItem
        alwaysVisible
        icon={selectIcon}
        text="Выбрать устройства"
        onClick={startSelectingDevices}
      />
      <ToolbarItem template="filter" alwaysVisible />
      <ToolbarItem template="download" onClick={handleDownload} />
      <ToolbarItem template="print" onClick={handlePrint} />
    </Toolbar>
  ) : (
    <Toolbar>
      <ToolbarItem main template="cancel" onClick={clearSelectedDevices} />
      <ToolbarItem
        alwaysVisible
        icon={detachIcon}
        text="Открепить устройства"
        onClick={handleBatchDetach}
      />
      <ToolbarItem template="filter" alwaysVisible />
    </Toolbar>
  );

  return (
    <>
      <TopbarTitle>{titleText}</TopbarTitle>
      <TopbarSearch />
      {toolbar}
      {!selectionMode && <Fab template="create" onClick={routeToCreatePage} />}
    </>
  );
}

export default DeviceListToolbar;
