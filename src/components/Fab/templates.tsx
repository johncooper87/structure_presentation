import CreateIcon from '@material-ui/icons/Add';
import CreateList from '@material-ui/icons/PlaylistAdd';
import SaveIcon from '@material-ui/icons/Save';

const templates = {
  create: {
    icon: <CreateIcon />,
    label: 'Добавить',
  },
  createByList: {
    icon: <CreateList />,
    label: 'Добавить списком',
  },
  save: {
    icon: <SaveIcon />,
    label: 'Сохранить',
  },
} as const;

export default templates;
