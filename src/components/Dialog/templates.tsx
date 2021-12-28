import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const templates = {
  delete: {
    className: 'danger',
    children: (
      <>
        <DeleteIcon className="leading-icon" />
        Удалить
      </>
    ),
  },
  save: {
    children: (
      <>
        <SaveIcon className="leading-icon" />
        Сохранить
      </>
    ),
  },
  accept: {
    children: (
      <>
        <SaveIcon className="leading-icon" />
        Принять
      </>
    ),
  },
  close: {
    children: (
      <>
        Закрыть
      </>
    ),
  },
} as const;

export default templates;
