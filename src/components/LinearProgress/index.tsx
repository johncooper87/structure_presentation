import {
  LinearProgress as MuiLinearProgress,
  LinearProgressProps as MuiLinearProgressProps,
} from '@material-ui/core';
import { classes } from 'utils';

export interface LinearProgressProps extends MuiLinearProgressProps {
  display?: boolean;
}

function LinearProgress({ display, className, ...props }: LinearProgressProps) {
  return (
    <MuiLinearProgress
      key={display ? 0 : 1}
      className={classes(className, display ? undefined : 'invisible')}
      {...props}
    />
  );
}

export default React.memo(LinearProgress);
