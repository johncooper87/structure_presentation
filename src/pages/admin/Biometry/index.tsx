import BiometryIcon from '@material-ui/icons/Fingerprint';
import { TopbarTitle, Toolbar, ToolbarItem } from 'components';
import { http, notify } from 'utils';
import BiometryData from './BiometryData';
import BiometryRequestDialog from './BiometryRequestDialog';
import styles from './styles.module.scss';

async function getBiometryEntries(): Promise<BiometryDTO[]> {
  try {
    const response = await http.get(
      '/api/kbi/biometric',
      {},
      {
        onError: () => notify.error('Не удалось получить журнал биометрии'),
      }
    );

    return response?.reverse();
  } catch {
    return [];
  }
}

function BiometryPage() {
  const { data = [] } = useQuery('ADMIN/BIOMETRY', getBiometryEntries);
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <TopbarTitle>Журнал биометрии</TopbarTitle>
      <Toolbar>
        <ToolbarItem text="Сделать запрос" icon={<BiometryIcon />} onClick={openDialog} />
      </Toolbar>
      <div className={styles.root}>
        <BiometryData data={data} />
      </div>
      <BiometryRequestDialog open={dialogOpen} onClose={closeDialog} />
    </>
  );
}

export default BiometryPage;
