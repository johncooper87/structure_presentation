import useField from './useField';
import { errorSubscription } from './subscriptions';
import shouldDisplayFieldError from './shouldDisplayFieldError';

interface FieldErrorProps {
  name?: string
  component?: 'div' | 'span'
}

function FieldError({ name, component: Component = 'div' }: FieldErrorProps) {

  const field = useField(name, { subscription: errorSubscription });

  const displayError = shouldDisplayFieldError(field);
  const { error, submitError } = field;

  return displayError
    ? (
      <Component style={{ color: 'red', fontSize: '14px' }}>
        {error || submitError}
      </Component>
    ) : null;
}

export default React.memo(FieldError);
