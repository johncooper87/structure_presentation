import { ListItem, ListItemProps, Collapse, Grid, IconButton } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { store } from 'app';
import ListItemClickAction from './ListItemClickAction';

import styles from './styles.module.scss';

interface ExpandableListItemProps extends ListItemProps {
  collapse: ReactNode;
  exclusive?: boolean | string;
  expanded?: boolean;
  onExpand?: React.MouseEventHandler<HTMLDivElement>;
}

function ExpandableListItem({
  children,
  collapse,
  onClick,
  button,
  exclusive,
  expanded,
  onExpand,
  ...props
}: ExpandableListItemProps) {
  const uniqueKey = useMemo(() => new Date().getTime(), []);

  const [open, setOpen] = useState(false);
  const exclusivelyOpenSelector = useCallback(
    ({ expand }: AppState) => expand.expandList.get(exclusive) === uniqueKey,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exclusive]
  );
  const exclusivelyOpen = useSelector(exclusivelyOpenSelector);

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    event => {
      event.stopPropagation();
      if (onExpand) onExpand(event);
      else if (exclusive)
        store.dispatch({ type: 'TOOGLE_EXPANDED', name: exclusive, key: uniqueKey });
      else setOpen(_open => !_open);
      // @ts-ignore
      onClick?.(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exclusive, onClick, onExpand]
  );

  const _open = expanded ?? (exclusive ? exclusivelyOpen : open);

  const ExpandIcon = _open ? ExpandLessIcon : ExpandMoreIcon;
  return (
    <>
      <ListItem {...props}>
        <Grid container alignItems="center">
          <ListItem
            component="span"
            style={{ flexGrow: 1, width: 'unset', padding: '0px', maxWidth: 'calc(100% - 64px)' }}
          >
            {children}
          </ListItem>
          <span>
            <ListItemClickAction showChildren onClick={handleClick}>
              <IconButton>
                <ExpandIcon className={styles.cascadingIcon} />
              </IconButton>
            </ListItemClickAction>
          </span>
        </Grid>
      </ListItem>
      <Collapse in={_open}>{collapse}</Collapse>
    </>
  );
}

export default React.memo(ExpandableListItem);
