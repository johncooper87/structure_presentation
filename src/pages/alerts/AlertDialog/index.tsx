import { Dialog } from 'components';
import { useDialogState } from 'hooks';
import AlertMapDialogContent from './AlertMapDialogContent';
import AlertRespondeDialogContent from './AlertRespondeDialogContent';

function AlertDialog() {
  const { open: openMap } = useDialogState('ALERTS/MAP');
  const { open: openResponde } = useDialogState('ALERTS/RESPONDE');
  const open = openMap || openResponde;

  return (
    <Dialog open={open}>
      {openMap && <AlertMapDialogContent />}
      {openResponde && <AlertRespondeDialogContent />}
    </Dialog>
  );
}

export default AlertDialog;
