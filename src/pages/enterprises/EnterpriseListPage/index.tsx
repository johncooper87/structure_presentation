import React from 'react';
import EnterpriseListPageView from './EnterpriseListPageView';
import EnterpriseListItemMenu from './EnterpriseListItemMenu';
import EnterpriseListToolbar from './EnterpriseListToolbar';
import EnterpriseListFilterbar from './EnterpriseListFilterbar';

const EnterpriseListPage = () => {
  return (
    <>
      <EnterpriseListToolbar />
      <EnterpriseListFilterbar />
      <EnterpriseListItemMenu />
      <EnterpriseListPageView />
    </>
  );
};

export default EnterpriseListPage;
