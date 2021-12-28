import React from 'react';
import ReactDOM from 'react-dom';
import { Fab as MuiFab, FabProps as MuiFabProps } from '@material-ui/core';

import { useLayout } from 'hooks';
import useTopbarUpdater from 'hooks/useTopbarUpdater';
import { classes } from 'utils';
import { getPortalContainer } from 'utils/contents';
import templates from './templates';
import styles from './styles.module.scss';

const primaryActionsContainer = getPortalContainer('primary-actions-container');

export interface FabProps extends React.HTMLAttributes<HTMLButtonElement> {
  extended?: boolean;
  label?: string;
  icon?: ReactNode;
  onClick?: MuiFabProps['onClick'];
  template?: keyof typeof templates;
  disabled?: boolean;
}

function Fab({ extended, className, template, disabled, ...props }: FabProps) {
  // useLayoutEffect(() => {
  //   document.body.style.setProperty(
  //     '--topbar-extra-height',
  //     document.getElementById('fab-container').clientHeight / 2 + 'px'
  //   );
  // });
  useTopbarUpdater();

  const { icon, label, onClick } = { ...templates[template], ...props };

  const layout = useLayout();
  const _extended = extended ?? layout !== 'mobile';

  const content = (
    <MuiFab
      disabled={disabled}
      className={classes(styles.root, className)}
      variant={_extended ? 'extended' : undefined}
      color="secondary"
      onClick={onClick}
    >
      {icon}
      {_extended && label}
    </MuiFab>
  );

  return ReactDOM.createPortal(content, primaryActionsContainer);
}

export default Fab;
