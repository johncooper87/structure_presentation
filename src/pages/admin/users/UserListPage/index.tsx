import React from 'react';
import UserListPageView from './UserListPageView';
import UserListItemMenu from './UserListItemMenu';
import UserListToolbar from './UserListToolbar';
import UserListFilterbar from './UserListFilterbar';

const UserListPage = () => {
  return (
    <>
      <UserListToolbar />
      <UserListFilterbar />
      <UserListItemMenu />
      <UserListPageView />
    </>
  );
};

export default UserListPage;
