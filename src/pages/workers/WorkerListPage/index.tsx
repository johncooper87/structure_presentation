import React from 'react';
import WorkerListPageView from './WorkerListPageView';
import WorkerListItemMenu from './WorkerListItemMenu';
import WorkerListToolbar from './WorkerListToolbar';
import WorkerListFilterbar from './WorkerListFilterbar';

const WorkerListPage = () => {
  return (
    <>
      <WorkerListToolbar />
      <WorkerListFilterbar />
      <WorkerListItemMenu />
      <WorkerListPageView />
    </>
  );
};

export default WorkerListPage;
