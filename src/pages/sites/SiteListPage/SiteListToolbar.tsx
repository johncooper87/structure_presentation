import { routeToCreatePage } from 'actions';
import { store } from 'app';
import { TopbarTitle, Toolbar, ToolbarItem, TopbarSearch, Fab } from 'components';
import { createCSV, downloadFile, getQueryParams } from 'utils';
import fetchPageSiteList from '../queries/fetchPageSiteList';

async function fetchSiteTableData() {
  const { page, pageSize, ...params }: SiteListPageQueryParams = getQueryParams();
  const sites = await fetchPageSiteList({
    ...params,
    page: 0,
    pageSize: 999999999,
  });

  const head = ['Название', 'Компания', 'Адрес'];

  const body = sites.data.map(site => {
    const {
      zoneGroup: { name, attributes, parent },
    } = site;
    const { addr } = attributes;
    return [name, parent.name ?? '', addr ?? ''];
  });

  return { head, body };
}

async function handleDownload() {
  const { head, body } = await fetchSiteTableData();
  const csvData = createCSV(head, body);
  downloadFile(new Blob([csvData], { type: 'text/csv' }), 'Объекты.csv');
}

async function handlePrint() {
  const { head, body } = await fetchSiteTableData();
  store.dispatch({ type: 'SET_PRINT_DATA', head, body });
  print();
}

function SiteListToolbar() {
  return (
    <>
      <TopbarTitle>Объекты</TopbarTitle>
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

export default SiteListToolbar;
