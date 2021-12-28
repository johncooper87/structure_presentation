import { FormSubscription } from 'final-form';
import useFormState from './useFormState';

const subscription: FormSubscription = {
  error: true,
  submitError: true,
  submitFailed: true,
};

interface FormErrorProps {
  component: 'div' | 'span'
}

function FormError({ component: Component = 'div' }: FormErrorProps) {

  const { error, submitError, submitFailed } = useFormState(subscription);

  const displayError = (error && typeof error === 'string' && submitFailed)
  || (submitError && typeof submitError === 'string');

  return displayError
    ? (
      <Component style={{ color: 'red', fontSize: '14px' }}>
        {error || submitError}
      </Component>
    ) : null;
}

export default React.memo(FormError);
