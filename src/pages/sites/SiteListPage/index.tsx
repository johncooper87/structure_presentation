import React from 'react';
import SiteListPageView from './SiteListPageView';
import SiteListItemMenu from './SiteListItemMenu';
import SiteListToolbar from './SiteListToolbar';
import SiteListFilterbar from './SiteListFilterbar';

const SiteListPage = () => {
  return (
    <>
      <SiteListToolbar />
      <SiteListFilterbar />
      <SiteListItemMenu />
      <SiteListPageView />
    </>
  );
};

export default SiteListPage;
