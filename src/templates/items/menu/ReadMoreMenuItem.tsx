import React from 'react';
import ReadMoreIcon from 'components/icons/ReadMore';
import CascadingMenuItem from 'components/Menu/CascadingMenuItem';

const readMoreIcon = <ReadMoreIcon />;
// @ts-ignore
const ReadMoreMenuItem: typeof CascadingMenuItem = React.forwardRef((props, ref) => {
  return <CascadingMenuItem ref={ref} icon={readMoreIcon} text="Подробнее" {...props} />;
});

export default React.memo(ReadMoreMenuItem);
