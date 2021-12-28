import { Box } from '@material-ui/core';
import React from 'react';
import styles from './ProgressBar.module.scss';

export type ProgressBarProps = {
  percentage: number;
  color: string;
};

const Filler = ({ percentage, color }) => (
  <Box
    className={styles.filler}
    style={{
      width: `${percentage}%`,
      background: color,
    }}
  />
);

const ProgressBar = ({ percentage, color }) => (
  <Box className={styles.progressBar}>
    <Filler percentage={percentage} color={color} />
  </Box>
);

export default React.memo(ProgressBar);
