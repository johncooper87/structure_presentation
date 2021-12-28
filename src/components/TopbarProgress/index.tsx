import React from 'react';
import ReactDOM from 'react-dom';
import { getPortalContainer } from 'utils/contents';
import LinearProgress, { LinearProgressProps } from '../LinearProgress';
import styles from './styles.module.scss';

const topbarProgressContainer = getPortalContainer('topbar-progress');

function TopbarProgress(props: LinearProgressProps) {
  const indicator = (
    <span className={styles.root}>
      <LinearProgress {...props} />
    </span>
  );
  return ReactDOM.createPortal(indicator, topbarProgressContainer);
}

export default TopbarProgress;
