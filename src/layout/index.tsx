import React from 'react';

import { renderPortalContainer } from 'utils/contents';
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import PrimaryActions from './PrimaryActions';
import styles from './styles.module.scss';

const rightbarContainer = renderPortalContainer('rightbar-container');

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.root}>
      <TopBar />
      <LeftBar />
      <PrimaryActions />
      <div className={styles.content}>{children}</div>
      {rightbarContainer}
    </div>
  );
}

export default Layout;
