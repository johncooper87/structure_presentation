import PrintIcon from '@material-ui/icons/Print';
import FilterIcon from '@material-ui/icons/FilterList';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RefreshIcon from '@material-ui/icons/Refresh';
import DetailsIcon from '@material-ui/icons/Visibility';

import { store } from 'app';
// import { useLayout } from 'hooks';

const templates = {
  filter: {
    icon: <FilterIcon />,
    text: 'Фильтры',
    onClick: () => store.dispatch({ type: 'TOGGLE_RIGHTBAR' }),
    // Wrapper: ({ children }: { children: ReactElement }) => {
    //   const layout = useLayout();
    //   if (layout === 'desktop') return null;
    //   return children;
    // },
  },
  print: {
    icon: <PrintIcon />,
    text: 'Распечатать',
  },
  download: {
    icon: <DownloadIcon />,
    text: 'Загрузить',
  },
  edit: {
    icon: <EditIcon />,
    text: 'Редактировать',
  },
  delete: {
    icon: <DeleteIcon />,
    text: 'Удалить',
  },
  cancel: {
    icon: <CancelIcon />,
    text: 'Отмена',
  },
  back: {
    icon: <ArrowBackIcon />,
    text: 'Назад',
  },
  refresh: {
    icon: <RefreshIcon />,
    text: 'Обновить',
  },
  details: {
    icon: <DetailsIcon />,
    text: 'Подробнее',
  },
} as const;

export default templates;
