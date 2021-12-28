import { routeToCreatePage } from 'actions';
import { store } from 'app';
import { Fab, Toolbar, ToolbarItem, TopbarSearch, TopbarTitle } from 'components';
import { createCSV, downloadFile, getQueryParams, openDialog } from 'utils';
import fetchPageWorkerList from '../queries/fetchPageWorkerList';

async function fetchEnterpriseTableData() {
  const { page, pageSize, ...params }: WorkerListPageQueryParams = getQueryParams();
  const workers = await fetchPageWorkerList({
    ...params,
    page: 0,
    pageSize: 999999999,
  });

  const head = ['ФИО', 'Пол', 'Должность', 'Устройство', 'Компания', 'Объекты'];

  const body = workers.data.map(worker => {
    const { fullName, enterprise, builds, device, attributes, profession } = worker;
    const { displayName: enterpriseName } = enterprise ?? {};
    const { name: deviceSerialNumber } = device ?? {};
    const { gender } = attributes;
    const { name: position } = profession;
    return [
      fullName,
      gender === '0' ? 'Муж' : 'Жен',
      position ?? '',
      deviceSerialNumber ?? '',
      enterpriseName ?? '',
      builds?.map(cs => cs.name).join(', ') ?? '',
    ];
  });

  return { head, body };
}

async function handleDownload() {
  const { head, body } = await fetchEnterpriseTableData();
  const csvData = createCSV(head, body);
  downloadFile(new Blob([csvData], { type: 'text/csv' }), 'Сотрудники.csv');
}

async function handlePrint() {
  const { head, body } = await fetchEnterpriseTableData();
  store.dispatch({ type: 'SET_PRINT_DATA', head, body });
  print();
}

const handleAddList = () => openDialog('WORKERS/CREATE_BY_LIST', 'addListWorkers');

function WorkerListToolbar() {
  return (
    <>
      <TopbarTitle>Сотрудники</TopbarTitle>
      <TopbarSearch />
      <Toolbar>
        <ToolbarItem template="filter" alwaysVisible />
        <ToolbarItem template="download" onClick={handleDownload} />
        <ToolbarItem template="print" onClick={handlePrint} />
      </Toolbar>
      <Fab template="create" onClick={routeToCreatePage} />
      <Fab template="createByList" onClick={handleAddList} />
    </>
  );
}

export default WorkerListToolbar;
