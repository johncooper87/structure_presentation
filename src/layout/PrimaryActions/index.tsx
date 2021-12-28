import React from 'react';

import { renderPortalContainer } from 'utils/contents';
import styles from './styles.module.scss';

const primaryActionsContainer = renderPortalContainer('primary-actions-container');

function PrimaryActions() {
  const rootRef = useRef<HTMLDivElement>();
  // useLayoutEffect(() => {
  //   const observer = new MutationObserver(mutations => {
  //     for (const { type } of mutations) {
  //       if (type === 'childList') {
  //         document.body.style.setProperty(
  //           '--topbar-extra-height',
  //           rootRef.current.clientHeight / 2 + 'px'
  //         );
  //         updateTopbar();
  //       }
  //     }
  //   });
  //   observer.observe(getPortalContainer('primary-actions-container'), { childList: true });
  //   return () => observer.disconnect();
  // }, []);

  return (
    <div id="fab-container" ref={rootRef} className={styles.root}>
      {primaryActionsContainer}
    </div>
  );
}

export default PrimaryActions;
