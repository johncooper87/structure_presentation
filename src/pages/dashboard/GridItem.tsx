import { Paper, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DragIcon from '@material-ui/icons/DragIndicator';
import { store } from 'app';
import { classes } from 'utils';
import styles from './styles.module.scss';

const gridItemSelector = ({ dashboard }: AppState) => dashboard.isLocked;

interface GridItemProps {
  gridKey: string;
  title: string;
  children?: ReactNode;
}

function GridItem({ gridKey, title, children }: GridItemProps) {
  const isLocked = useSelector(gridItemSelector, shallowEqual);
  const removeItem = useCallback(
    () => store.dispatch({ type: 'TOGGLE_ITEM_DISPLAY_STATE', itemKey: gridKey }),
    [gridKey]
  );

  return (
    <Paper elevation={2} className={styles.gridItem}>
      <div className={styles.gridItemHeader}>
        <div className={classes(styles.gridItemTitle, isLocked ? undefined : 'draggable')}>
          {!isLocked && <DragIcon />}
          <Typography className={styles.gridItemTitleText}>{title}</Typography>
        </div>
        {!isLocked && (
          <div>
            <IconButton size="small" onClick={removeItem}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>
      <div className={styles.gridItemContent}>{children}</div>
    </Paper>
  );
}

export default GridItem;
