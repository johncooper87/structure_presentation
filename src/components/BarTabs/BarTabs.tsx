import { BottomNavigation, Divider, Tabs, Toolbar } from '@material-ui/core';
import { useLayout } from 'hooks';
import ReactDOM from 'react-dom';
import { getPortalContainer } from 'utils/contents';

const barTabsContainer = getPortalContainer('bar-tabs');

function setCSSVar(node: Element) {
  if (node) {
    document.body.style.setProperty('--bottom-bar-height', node.clientHeight + 'px');
  } else {
    document.body.style.setProperty('--bottom-bar-height', '0px');
  }
}

interface BarTabsProps {
  children: ReactNode;
  value: any;
  disableMobile?: boolean;
  onChange: TabChangeHandler;
}

function BarTabs({ value, onChange, children, disableMobile }: BarTabsProps) {
  // useTopbarUpdater();

  const layout = useLayout();

  let content = null;

  if (children) {
    const _children = React.Children.map(children, child => {
      if (!child) return null;
      // @ts-expect-error
      return React.cloneElement(child, { disableMobile });
    });
    if (layout === 'mobile' && !disableMobile) {
      content = (
        <div
          ref={setCSSVar}
          style={{
            position: 'fixed',
            bottom: '0px',
            top: 'unset',
            width: '100%',
            zIndex: 1000,
            paddingTop: '12px',
          }}
        >
          <Divider />
          <BottomNavigation {...{ value, onChange }}>{_children}</BottomNavigation>
        </div>
      );
    } else {
      content = (
        <Toolbar className="bar-tabs-toolbar">
          <Tabs {...{ value, onChange }}>{_children}</Tabs>
        </Toolbar>
      );
    }
  }

  return ReactDOM.createPortal(content, barTabsContainer);
}

export default BarTabs;
