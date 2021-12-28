import { Tab, TabProps, BottomNavigationAction } from '@material-ui/core';

import { useLayout } from 'hooks';
import useTopbarUpdater from 'hooks/useTopbarUpdater';

type BarTabProps = Pick<TabProps, 'label' | 'icon' | 'value' | 'style'> & {
  disableMobile?: boolean;
};

function BarTab({ icon, value, label, disableMobile, ...props }: BarTabProps) {
  useTopbarUpdater();
  const {
    style,
    onChange,
    selected,
    // only BottomNavigationAction props
    showLabel,
    // only Tab props
    fullWidth,
    indicator,
    selectionFollowsFocus,
    textColor,
  } = props as Record<string, any>;

  const layout = useLayout();

  if (layout === 'mobile' && !disableMobile)
    return <BottomNavigationAction {...{ icon, value, label, onChange, selected, showLabel, style }} />;

  return (
    <Tab
      {...{
        style,
        icon,
        value,
        label,
        onChange,
        selected,
        fullWidth,
        indicator,
        selectionFollowsFocus,
        textColor,
      }}
    />
  );
}

export default BarTab;
