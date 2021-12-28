/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Drawer, SwipeableDrawer, IconButton, Box } from '@material-ui/core';
import MaximizeIcon from '@material-ui/icons/ChevronRight';
import MinimizeIcon from '@material-ui/icons/ChevronLeft';

import { store } from 'app';
import { useLayout } from 'hooks';
import { getLayout } from 'hooks/useLayout';
import Profile from './Profile';
import NavList from './NavList';
import styles from './styles.module.scss';

let leftbarOpen = JSON.parse(localStorage.getItem('leftbarOpen')) ?? getLayout(window.innerWidth) === 'desktop';
if (!leftbarOpen && getLayout(window.innerWidth) !== 'mobile')
  document.body.style.setProperty('--leftbar-width', 'var(--minimized-leftbar-width)');

function handleLeftbarMinimized() {
  const layout = getLayout(window.innerWidth);
  if (layout === 'mobile') {
    document.body.style.setProperty('--leftbar-width', 'var(--maximized-leftbar-width)');
    return;
  }

  const { leftbarOpen } = store.getState().layout;
  const leftbarState = leftbarOpen ? 'maximized' : 'minimized';
  document.body.style.setProperty('--leftbar-width', `var(--${leftbarState}-leftbar-width)`);
}
window.addEventListener('resize', handleLeftbarMinimized);

store.subscribe(() => {
  const layoutState = store.getState().layout;
  if (layoutState.leftbarOpen !== leftbarOpen) {
    leftbarOpen = layoutState.leftbarOpen;
    handleLeftbarMinimized();
  }
});

const closeLeftbar = () => store.dispatch({ type: 'CLOSE_LEFTBAR' });
const openLeftbar = () => store.dispatch({ type: 'TOGGLE_LEFTBAR' });

const leftbarSelector = ({ layout }) => layout.leftbarOpen;

function LeftBar() {
  const layout = useLayout();
  const open = useSelector(leftbarSelector, shallowEqual);

  const content = (
    <>
      <Profile />
      <NavList />
      <div className={styles.appName}>
        <Box display="flex" alignItems="center">
          {layout !== 'mobile' && (
            open ? (
              <IconButton size="small" color="inherit" onClick={closeLeftbar}>
                <MinimizeIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton size="small" color="inherit" onClick={openLeftbar}>
                <MaximizeIcon fontSize="small" />
              </IconButton>
            )
          )}
          {(layout === 'mobile' || open) && <span>{process.env.REACT_APP_NAME}</span>}
        </Box>
      </div>
    </>
  );

  return (
    <>
      {layout === 'mobile' && (
        <SwipeableDrawer
          className={styles.drawer}
          variant="temporary"
          open={open}
          onClose={closeLeftbar}
          onOpen={openLeftbar}
          ModalProps={{ keepMounted: true }}
        >
          {content}
        </SwipeableDrawer>
      )}
      {layout === 'tablet' && (
        <>
          {open && <div className={styles.backdrop} onClick={closeLeftbar} />}
          <Drawer
            className={styles.drawer}
            variant="permanent"
            open
            style={{ position: 'absolute' }}
          >
            <div
              style={{ width: open ? 'var(--maximized-leftbar-width)' : undefined }}
              className={styles.drawerPaperInner}
            >
              {content}
            </div>
          </Drawer>
        </>
      )}
      {layout === 'desktop' && (
        <Drawer className={styles.drawer} variant="permanent" open style={{ position: 'absolute' }}>
          <div
            style={{ width: open ? 'var(--maximized-leftbar-width)' : undefined }}
            className={styles.drawerPaperInner}
          >
            {content}
          </div>
        </Drawer>
      )}
    </>
  );
}

export default LeftBar;
