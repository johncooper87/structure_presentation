import HelpIcon from '@material-ui/icons/HelpOutline';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { lastDayOfMonth } from 'date-fns';
import { TopbarTitle, Toolbar, ToolbarItem } from 'components';
import { openDialog, refetchActiveQuery, http, notify, getQueryParams, downloadFile } from 'utils';

const handleHelp = () => openDialog('ANALYTICS/T12HELP', {});
const refresh = () => refetchActiveQuery('ANALITICS/T12REPORT');

async function fetchT12ReportData({
  enterpriseId,
  constructionSiteId,
  workerId,
  date,
}: T12ReportPageQueryParams) {
  const begin = date.slice(0, 7) + '-01';
  const end = date.slice(0, 7) + '-' + lastDayOfMonth(new Date(date)).getDate();
  const { result }: APIResponse<any[]> = await http.post(
    '/api/kbi/analytic/formt12report',
    {
      enterpriseId,
      constructionId: constructionSiteId,
      workerId,
      begin,
      end,
    },
    { onError: () => notify.error('Не удалось получить отчет Т12') }
  );

  return result;
}

async function handleDownloadExcel() {
  const params = getQueryParams() as unknown as T12ReportPageQueryParams;
  if (Object.keys(params).length === 0) return;

  const {
    enterpriseId,
    constructionSiteId,
    workerId,
    date,
  } = params;
  const begin = date.slice(0, 7) + '-01';
  const end = date.slice(0, 7) + '-' + lastDayOfMonth(new Date(date)).getDate();

  const file: File = await http.post(
    '/api/kbi/analytic/formt12reportexcel',
    {
      enterpriseId,
      constructionId: constructionSiteId,
      workerId,
      begin,
      end,
    },
    {
      onError: () => notify.error('Не удалось получить отчет Т12'),
    }
  );
  if (!file) return;
  downloadFile(file, file.name);
}

async function handleDownloadXml() {
  const params = getQueryParams() as unknown as T12ReportPageQueryParams;
  if (Object.keys(params).length === 0) return;

  const {
    enterpriseId,
    constructionSiteId,
    workerId,
    date,
  } = params;
  const begin = date.slice(0, 7) + '-01';
  const end = date.slice(0, 7) + '-' + lastDayOfMonth(new Date(date)).getDate();

  const file: File = await http.post(
    '/api/kbi/analytic/formt12reportxml',
    {
      enterpriseId,
      constructionId: constructionSiteId,
      workerId,
      begin,
      end,
    },
    {
      onError: () => notify.error('Не удалось получить отчет Т12'),
    }
  );
  if (!file) return;
  downloadFile(file, file.name);
}

function downloadMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const downloadClose = loadFunc => {
    return () => {
      loadFunc();
      handleClose();
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <DownloadIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={downloadClose(handleDownloadExcel)}>Excel</MenuItem>
        <MenuItem onClick={downloadClose(handleDownloadXml)}>Xml</MenuItem>
      </Menu>
    </div>
  );
};

const helpIcon = <HelpIcon />;

function T12ReportToolbar() {
  return (
    <>
      <TopbarTitle>Форма Т12</TopbarTitle>
      <Toolbar>
        <ToolbarItem icon={helpIcon} text="Cправка по буквенным кодам" onClick={handleHelp} />
        <ToolbarItem template="filter" />
        <ToolbarItem template="refresh" onClick={refresh} />
        <ToolbarItem icon={downloadMenu()} text="" />
      </Toolbar>
    </>
  );
}

export default T12ReportToolbar;
