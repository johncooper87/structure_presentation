import DeleteIcon from '@material-ui/icons/Delete';
import ToolbarItem from 'components/Toolbar/ToolbarItem';

const deleteIcon = <DeleteIcon />;

// @ts-ignore
const ToolbarDeleteItem: typeof ToolbarItem = React.forwardRef((props, ref) => {
  return <ToolbarItem ref={ref} icon={deleteIcon} text="Удалить" {...props} />;
});

export default React.memo(ToolbarDeleteItem);
