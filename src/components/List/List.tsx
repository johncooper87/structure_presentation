import React from 'react';
import { List as MuiList } from '@material-ui/core';
import styles from './styles.module.scss';

interface ListProps {
  children: ReactNode;
  emptyText?: string;
}

function List({ children, emptyText = 'Ничего не найдено' }: ListProps) {
  return (
    <MuiList>
      {children instanceof Array && children?.length === 0 ? (
        <div className={styles.emptyText}>{emptyText}</div>
      ) : (
        children
      )}
    </MuiList>
  );
}

export default List;
