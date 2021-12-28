import EditIcon from '@material-ui/icons/Edit';
import ToolbarItem from 'components/Toolbar/ToolbarItem';

const editIcon = <EditIcon />;

// @ts-ignore
const ToolbarEditItem: typeof ToolbarItem = React.forwardRef((props, ref) => {
  return <ToolbarItem ref={ref} icon={editIcon} text="Редактировать" {...props} />;
});

export default React.memo(ToolbarEditItem);
