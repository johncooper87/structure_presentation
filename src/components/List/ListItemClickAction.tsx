import React from 'react';
import { ListItem, ListItemProps } from '@material-ui/core';
import { useLayout } from 'hooks';
import styles from './styles.module.scss';

interface ListItemClickActionProps<T extends React.ElementType<any> = 'div'> {
  onClick?: ListItemProps<T>['onClick'];
  children?: ReactChild;
  showOverlay?: boolean;
  showChildren?: boolean;
}

function ListItemClickAction<T extends React.ElementType<any> = 'div'>({
  onClick,
  children,
  showOverlay,
  showChildren,
}: ListItemClickActionProps<T>) {
  const layout = useLayout();

  let child = children == null ? null : React.Children.only(children);

  if (layout === 'mobile')
    return (
      <ListItem
        component="span"
        selected={showOverlay}
        button
        onClick={onClick}
        className={styles.clickAction}
        style={{ alignItems: 'center' }}
        // eslint-disable-next-line react/no-children-prop
        children={
          showChildren ? (
            <>
              <span style={{ flexGrow: 1 }} />
              {child}
            </>
          ) : undefined
        }
      />
    );

  child = React.isValidElement(child) ? React.cloneElement(child, { onClick }) : null;
  if (!showOverlay) return child;
  return (
    <>
      {child}
      <ListItem component="span" selected className={styles.clickAction} />
    </>
  );
}

export default ListItemClickAction;
