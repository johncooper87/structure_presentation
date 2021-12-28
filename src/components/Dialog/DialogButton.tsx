import { Button, ButtonProps } from '@material-ui/core';
import { useMutableState } from 'hooks';
import { useDialogContext } from './DialogContext';
import templates from './templates';

interface DialogButtonProps extends ButtonProps {
  template?: keyof typeof templates;
  component?: React.FunctionComponent<any> | string;
  render?: React.ReactElement;
}

interface DialogButtonMutableState {
  props: DialogButtonProps;
}

function DialogButton({ render, component, ...props }: DialogButtonProps) {
  const { open, disabled } = useDialogContext();
  const current = useMutableState<DialogButtonMutableState>();
  if (open) current.props = { disabled, ...templates[props.template], ...props };

  if (render != null) return React.cloneElement(render, current.props);

  const Component = component || Button;
  return <Component {...current.props} />;
}

export default React.memo(DialogButton);
