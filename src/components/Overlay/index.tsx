import React from 'react';
import styles from './styles.module.scss';

interface OverlayProps {
  display?: boolean;
  children: ReactNode;
}

function Overlay({ display: active, children }: OverlayProps) {
  return (
    <div className={styles.root}>
      <div className={styles.overlay} style={{ visibility: active ? 'visible' : 'hidden' }} />
      {children}
    </div>
  );
}

export default Overlay;
