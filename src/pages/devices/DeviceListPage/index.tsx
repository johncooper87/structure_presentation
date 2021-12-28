import React from 'react';
import DeviceListPageView from './DeviceListPageView';
import DeviceListItemMenu from './DeviceListItemMenu';
import DeviceListToolbar from './DeviceListToolbar';
import DeviceListFilterbar from './DeviceListFilterbar';
import DeviceDetachDialog from './DeviceDetachDialog';

const DeviceListPage = () => {
  return (
    <>
      <DeviceListToolbar />
      <DeviceListFilterbar />
      <DeviceListItemMenu />
      <DeviceListPageView />
      <DeviceDetachDialog />
    </>
  );
};

export default DeviceListPage;
