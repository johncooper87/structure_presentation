import SaveIcon from '@material-ui/icons/Save';
import Fab from '../Fab';

export const submitButtonTemplates = {

  save: {
    children: <><SaveIcon className="leading-icon" />Сохранить</>,
  },

  'save-fab': {
    component: Fab,
    icon: <SaveIcon />,
    label: 'Сохранить',
  },

} as const;
