import { useRouteMatch } from 'react-router-dom';

interface FormModePathParams {
  mode: string;
}

function useFormPageMode() {
  const match = useRouteMatch<FormModePathParams>('*/:mode');
  if (match === null) return null;
  switch (match.params.mode) {
    case 'create':
      return 'create';
    case 'edit':
      return 'edit';
    default:
      return 'read';
  }
}

export default useFormPageMode;
