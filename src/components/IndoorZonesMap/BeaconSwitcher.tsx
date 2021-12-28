import { Box, Tooltip } from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import BlurOffIcon from '@material-ui/icons/BlurOff';
import React from 'react';
import styles from './styles.module.scss';

function BeaconSwitcher({ showBeacon, onChange }) {
    return (
      <Tooltip title={showBeacon ? 'Скрыть маяки' : 'Показать маяки' }>
      <Box className={styles.controlContainer} onClick={onChange}>
        {showBeacon ? <BlurOnIcon /> : <BlurOffIcon />}
      </Box>
      </Tooltip>
    );
}

export default BeaconSwitcher;
