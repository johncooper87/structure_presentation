import React from 'react';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles.module.scss';

interface LoadingIndicatorProps {
  display: boolean;
}

function CircularProgress({ display: active }: LoadingIndicatorProps) {
  return (
    <MuiCircularProgress
      color="secondary"
      className={styles.indicator}
      style={{ visibility: active ? 'visible' : 'hidden' }}
    />
  );
}

export default CircularProgress;
