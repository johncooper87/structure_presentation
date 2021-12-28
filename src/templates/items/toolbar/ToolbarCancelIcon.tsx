import CancelIcon from '@material-ui/icons/Close';
import ToolbarItem from 'components/Toolbar/ToolbarItem';

const cancelIcon = <CancelIcon />;

// @ts-ignore
const ToolbarCancelItem: typeof ToolbarItem = React.forwardRef((props, ref) => {
  return <ToolbarItem main ref={ref} icon={cancelIcon} text="Отмена" {...props} />;
});

export default React.memo(ToolbarCancelItem);
