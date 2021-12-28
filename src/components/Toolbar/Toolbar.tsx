import ReactDOM from 'react-dom';

import { useLayout } from 'hooks';
import { getPortalContainer } from 'utils/contents';
import isReactElement from 'utils/isReactElement';
import ToolbarMenu from './ToolbarMenu';

const toolbarItemsContainer = getPortalContainer('toolbar-items');

interface ToolbarProps {
  children: ReactNode;
}

const Toolbar: FunctionComponent<ToolbarProps> = ({ children }) => {
  const layout = useLayout();

  const mainItems = React.Children.map(children, child => {
    if (isReactElement(child) && child.props.main) return child;
    return null;
  });

  let anyAlwaysVisibleItem: ReactElement;

  const barItems = React.Children.map(children, child => {
    if (!isReactElement(child)) return child;
    if (child.props.main) return null;
    if (child.props.alwaysVisible) {
      anyAlwaysVisibleItem = child;
      return child;
    }
    if (
      !child.props.alwaysVisible &&
      !child.props.alwaysHidden &&
      (layout !== 'mobile' || !anyAlwaysVisibleItem)
    ) {
      anyAlwaysVisibleItem = child;
      return child;
    }
    return null;
  });

  const menuItems = React.Children.map(children, child => {
    if (!isReactElement(child) || child.props.main) return null;
    if (child.props.alwaysHidden) return child;
    if (!child.props.alwaysHidden && !child.props.alwaysVisible) {
      if (layout !== 'mobile' || child === anyAlwaysVisibleItem) return null;
      return child;
    }
    return null;
  });
  const menuItemsCount = React.Children.count(menuItems);

  const content = (
    <>
      {mainItems}
      {barItems}
      {menuItemsCount > 0 && <ToolbarMenu>{menuItems}</ToolbarMenu>}
    </>
  );

  return ReactDOM.createPortal(content, toolbarItemsContainer);
};

export default Toolbar;
