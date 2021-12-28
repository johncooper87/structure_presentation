import PrintIcon from '@material-ui/icons/Print';
import ToolbarItem from 'components/Toolbar/ToolbarItem';

const printIcon = <PrintIcon />;

// @ts-ignore
const ToolbarPrintItem: typeof ToolbarItem = React.forwardRef((props, ref) => {
  return <ToolbarItem ref={ref} icon={printIcon} text="Распечатать" {...props} />;
});

export default React.memo(ToolbarPrintItem);
