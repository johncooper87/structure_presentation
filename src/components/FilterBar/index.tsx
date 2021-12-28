import {
  Drawer,
  DrawerProps,
  SwipeableDrawer,
  SwipeableDrawerProps,
  Typography,
} from '@material-ui/core';
import { store } from 'app';
import { ResetButton, SubmitButton } from 'components';
import { Form, FormProps } from 'components/Form';
import { useLayout, useQueryParams } from 'hooks';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { updateQueryParams } from 'utils';
import clone from 'utils/clone';
import { getPortalContainer } from 'utils/contents';
import styles from './styles.module.scss';

const rightbarContainer = getPortalContainer('rightbar-container');

const closeFilterBar = () => {
  store.dispatch({ type: 'CLOSE_RIGHTBAR' });
};
const openFilterBar = () => {
  store.dispatch({ type: 'TOGGLE_RIGHTBAR' });
};

const filterBarSelector = ({ layout }: AppState) => {
  return layout.rightbarOpen;
};

interface FilterBarRecentValues {
  emptyFilter?: Record<string, any>;
}

const drawerStaticProps: Partial<DrawerProps | SwipeableDrawerProps> = {
  anchor: 'right',
  classes: { paper: styles.drawerPaper },
};

interface FilterBarProps<
  Values extends Object = Record<string, any>,
  InitialValues extends Partial<Values> = Partial<Values>
> extends Pick<FormProps<Values, InitialValues>, 'validate'> {
  children: ReactNode;
  initialValues?: Record<string, any>;
}

function FilterBar({ children, initialValues, ...props }: FilterBarProps) {
  const open = useSelector(filterBarSelector, shallowEqual);
  const layout = useLayout();

  const {
    page,
    // pageSize,
    search,
    ...filter
  } = useQueryParams();

  const recent = useRef<FilterBarRecentValues>({}).current;
  recent.emptyFilter = clone(filter, null);
  const handleSubmit = useCallback(
    ({ values }) => {
      // for (const key in values) {
      //   const value = values[key];
      //   if (value instanceof Date) values[key] = value.toISOString();
      // }
      updateQueryParams({ ...recent.emptyFilter, ...values, page: undefined });
      if (layout === 'mobile') closeFilterBar();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layout]
  );

  const innerRef = useRef<HTMLSpanElement>();
  useLayoutEffect(() => {
    if (layout === 'mobile') return;

    const bodyStyle = document.body.style;
    if ((layout === 'tablet' || layout === 'desktop') && !open) {
      bodyStyle.setProperty('--rightbar-width', '0px');
      return;
    }

    const { width } = innerRef.current.getBoundingClientRect();
    bodyStyle.setProperty('--rightbar-width', width + 'px');
    return () => bodyStyle.setProperty('--rightbar-width', '0px');
  }, [open, layout]);

  const drawerProps: Partial<DrawerProps | SwipeableDrawerProps> = useMemo(() => {
    switch (layout) {
      case 'mobile': {
        return {
          variant: 'temporary',
          onClose: closeFilterBar,
          ModalProps: { keepMounted: true },
          open,
          onOpen: openFilterBar,
        };
      }
      case 'tablet': {
        return {
          variant: 'persistent',
          open,
          style: { width: open ? undefined : '0px' },
        };
      }
      case 'desktop': {
        return {
          variant: 'persistent',
          open,
          style: { width: open ? undefined : '0px' },
        };
      }
    }
  }, [layout, open]);

  const DrawerComponent = layout !== 'mobile' ? Drawer : SwipeableDrawer;
  const rightbar = (
    // @ts-expect-error
    <DrawerComponent {...drawerStaticProps} {...drawerProps} className={styles.drawer}>
      <Form
        initialValues={initialValues}
        values={{ ...initialValues, ...filter }}
        onSubmit={handleSubmit}
        {...props}
      >
        <span ref={innerRef} className={styles.inner}>
          <div className={styles.header}>
            <Typography variant="h6">Фильтры</Typography>
          </div>
          <div className={styles.content}>
            {React.Children.map(children, child => (
              <span style={{ display: 'flex', flexDirection: 'column' }}>{child}</span>
            ))}
          </div>
          <div className={styles.footer}>
            <ResetButton label="Очистить" variant="outlined" />
            <SubmitButton>Показать</SubmitButton>
          </div>
        </span>
      </Form>
    </DrawerComponent>
  );

  return ReactDOM.createPortal(rightbar, rightbarContainer);
}

export default FilterBar;
