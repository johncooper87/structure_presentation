import React from 'react';
import { Badge, Typography } from '@material-ui/core';
import AlertsIcon from '@material-ui/icons/Notifications';

import useTotalAlerts from 'hooks/useTotalAlerts';
import { NavItem } from './NavItem';
import useLeftbarMinimized from './useLeftbarMinimized';
import styles from './styles.module.scss';

function AlertsNavItem() {
  const { unresponded } = useTotalAlerts();
  const leftbarMinimized = useLeftbarMinimized();

  if (leftbarMinimized) {
    const icon = (
      <Badge classes={{ badge: styles.iconBadge }} badgeContent={unresponded}>
        <AlertsIcon color="inherit" />
      </Badge>
    );
    return <NavItem icon={icon} path="/alerts" />;
  }

  const text = (
    <Badge classes={{ badge: styles.badge }} badgeContent={unresponded}>
      <Typography>Тревоги</Typography>
    </Badge>
  );
  return <NavItem icon={<AlertsIcon color="inherit" />} text={text} path="/alerts" />;
}

export default AlertsNavItem;
