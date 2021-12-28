import { routeToCreatePage } from 'actions';
import { store } from 'app';
import { TopbarTitle, Toolbar, ToolbarItem, TopbarSearch, Fab } from 'components';
import { createCSV, downloadFile, getQueryParams } from 'utils';
import fetchPageEnterpriseList from '../queries/fetchPageEnterpriseList';

async function fetchEnterpriseTableData() {
  const { page, pageSize, ...params }: EnterpriseListPageQueryParams = getQueryParams();
  const enterprises = await fetchPageEnterpriseList({
    ...params,
    page: 0,
    pageSize: 999999999,
  });

  const head = ['Название', 'Адрес', 'Кол-во сотрудников', 'Кол-во объектов'];

  const body = enterprises.data.map(enterprise => {
    const {
      enterprise: { name, attributes },
      objCount,
      workerCount,
    } = enterprise;
    const { addr } = attributes;
    return [name, addr ?? '', objCount, workerCount];
  });

  return { head, body };
}

async function handleDownload() {
  const { head, body } = await fetchEnterpriseTableData();
  const csvData = createCSV(head, body);
  downloadFile(new Blob([csvData], { type: 'text/csv' }), 'Компании.csv');
}

async function handlePrint() {
  const { head, body } = await fetchEnterpriseTableData();
  store.dispatch({ type: 'SET_PRINT_DATA', head, body });
  print();
}

function EnterpriseListToolbar() {
  return (
    <>
      <TopbarTitle>Компании</TopbarTitle>
      <TopbarSearch />
      <Toolbar>
        <ToolbarItem template="filter" alwaysVisible />
        <ToolbarItem template="download" onClick={handleDownload} />
        <ToolbarItem template="print" onClick={handlePrint} />
      </Toolbar>
      <Fab template="create" onClick={routeToCreatePage} />
    </>
  );
}

export default EnterpriseListToolbar;
