/* eslint-disable no-continue */
import React from 'react';
import { AppBar, IconButton, Toolbar, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { store } from 'app';
import { useLayout } from 'hooks';
import useTotalAlerts from 'hooks/useTotalAlerts';
import useTopbarUpdater from 'hooks/useTopbarUpdater';
import { renderPortalContainer } from 'utils/contents';
import styles from './styles.module.scss';

// function updateTopBarHeigthCSSVar(topBarEl: Element) {
//   const { height } = topBarEl.getBoundingClientRect();
//   document.body.style.setProperty('--topbar-base-height', height + 'px');
// }
// const observer = new MutationObserver(mutations => {
//   for (const mutation of mutations) {
//     const { type, target } = mutation;
//     if (type === 'childList') {
//       updateTopBarHeigthCSSVar(target as Element);
//     }
//   }
// });
// function observeTopBarEl(node: Element) {
//   if (node) {
//     updateTopBarHeigthCSSVar(node);
//     observer.observe(node, { childList: true });
//   } else observer.disconnect();
// }

const toggleLeftbar = () => {
  store.dispatch({ type: 'TOGGLE_LEFTBAR' });
};
const MenuButton = () => {
  const { unresponded } = useTotalAlerts();
  return (
    <IconButton color="inherit" onClick={toggleLeftbar} className={styles.menuButton}>
      <Badge classes={{ badge: 'badge' }} badgeContent={unresponded}>
        <MenuIcon />
      </Badge>
    </IconButton>
  );
};

const mainButton = renderPortalContainer('main-button');
const topbarTitle = renderPortalContainer('topbar-title');
const topbarSearch = renderPortalContainer('topbar-search');
const topbarProgress = renderPortalContainer('topbar-progress');
const toolbarItems = renderPortalContainer('toolbar-items');
const topbarField = renderPortalContainer('topbar-field');
const barTabs = renderPortalContainer('bar-tabs');

const topbarSelector = ({ layout: { topbarSearchExpanded: searchExpanded } }: AppState) => ({
  searchExpanded,
});

function TopBar() {
  useTopbarUpdater();

  const layout = useLayout();
  const { searchExpanded } = useSelector(topbarSelector, shallowEqual);

  const moveTitleDown = layout === 'mobile' && searchExpanded;
  const menuButton = layout === 'mobile' && <MenuButton />;
  return (
    <>
      <AppBar
        // ref={observeTopBarEl}
        position="fixed"
        id="topbar"
        className={styles.topBar}
        color={layout === 'mobile' ? 'primary' : 'default'}
      >
        <Toolbar>
          <span>
            {menuButton}
            {mainButton}
          </span>
          {!moveTitleDown && topbarTitle}
          {topbarField}
          <span className="flex-separator" />
          {topbarSearch}
          {toolbarItems}
        </Toolbar>
        {moveTitleDown && <Toolbar>{topbarTitle}</Toolbar>}
        {layout !== 'mobile' && barTabs}
        {topbarProgress}
      </AppBar>
      {layout === 'mobile' && barTabs}
    </>
  );
}

export default TopBar;
