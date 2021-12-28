import { queryClient, socket } from 'app';
import { http } from 'utils';

interface TotalAlerts {
  unresponded: number;
  today: number;
}

async function fetchTotalAlerts() {
  const [{ result: unresponded }, { result: today }]: [APIResponse<number>, APIResponse<number>] =
    await Promise.all([
      http.get('/api/kbi/alert/unresponded_count'),
      http.get('/api/kbi/alert/today_count'),
    ]);
  return { unresponded, today };
}

function useTotalAlerts(): TotalAlerts {
  const { data } = useQuery('ALERTS/TOTAL', fetchTotalAlerts);

  useEffect(() => {
    const unsubscribe = socket.subscribe('ALERT_COUNT_CHANGE', (data: TotalAlerts) =>
      queryClient.setQueryData('ALERTS/TOTAL', data)
    );
    // setTimeout(() => queryClient.setQueryData('ALERTS/TOTAL', { unresponded: 5 }), 2000);
    return unsubscribe;
  }, []);

  return data || Object();
}

export default useTotalAlerts;
