import { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Tooltip, IconButton, IconProps } from '@material-ui/core';

import { MenuItem } from 'components/Menu';
import useTopbarUpdater from 'hooks/useTopbarUpdater';
import { getPortalContainer } from 'utils/contents';
import ToolbarItemContext from './ToolbarItemContext';
import templates from './templates';

const mainButtonContainer = getPortalContainer('main-button');
const observer = new MutationObserver(mutations => {
  for (const { type, target } of mutations) {
    if (type === 'childList') {
      if (target.childNodes.length > 0)
        document.body.style.setProperty('--menu-button-display', 'none');
      else document.body.style.setProperty('--menu-button-display', undefined);
    }
  }
});
observer.observe(mainButtonContainer, { childList: true });

export interface ToolbarItemProps {
  icon?: ReactElement<IconProps>;
  text?: string;
  onClick?: (event: React.MouseEvent) => void;
  alwaysHidden?: boolean | null;
  alwaysVisible?: boolean | null;
  main?: boolean | null;
  template?: keyof typeof templates;
  disabled?: boolean;
  className?: string;
}

const ToolbarItem = React.forwardRef<HTMLLIElement, ToolbarItemProps>(
  ({ template, disabled, className, ...props }, ref) => {
    useTopbarUpdater();

    const {
      main,
      icon,
      text,
      onClick,
      Wrapper = React.Fragment,
    } = {
      ...templates[template],
      ...props,
    };

    const isMenuItem = useContext(ToolbarItemContext);
    if (isMenuItem && !main)
      return (
        <Wrapper>
          <MenuItem
            disabled={disabled}
            ref={ref}
            className={className}
            icon={icon}
            text={text}
            onClick={disabled ? undefined : onClick}
          />
        </Wrapper>
      );

    const content = (
      <Wrapper>
        <Tooltip title={text}>
          <span>
            {onClick ? <IconButton disabled={disabled} className={className} onClick={onClick}>
                {icon}
              </IconButton>
              : icon
            }
          </span>
        </Tooltip>
      </Wrapper>
    );

    if (main) return ReactDOM.createPortal(content, mainButtonContainer);

    return content;
  }
);

export default React.memo(ToolbarItem);
