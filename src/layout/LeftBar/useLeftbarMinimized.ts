import { useLayout } from 'hooks';

const useLeftbarMinimizedSelector = ({ layout }: AppState) => layout.leftbarOpen;

function useLeftbarMinimized() {
  const layout = useLayout();
  const leftbarOpen = useSelector(useLeftbarMinimizedSelector, shallowEqual);
  const minimized = layout !== 'mobile' && !leftbarOpen;
  return minimized;
}

export default useLeftbarMinimized;
