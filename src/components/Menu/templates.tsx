import DetailsIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ReadMoreIcon from 'components/icons/ReadMore';

const templates = {
  details: {
    icon: <DetailsIcon />,
    text: 'Посмотреть',
  },
  delete: {
    icon: <DeleteIcon />,
    text: 'Удалить',
  },
  readmore: {
    icon: <ReadMoreIcon />,
    text: 'Подробнее',
  },
} as const;

export default templates;
