import { useDialogState } from 'hooks';
import { DropzoneDialog } from 'material-ui-dropzone';
import { closeDialog, http, notify, refetchActiveQuery } from 'utils';

async function createListWorkers(listFile: File) {
  const formData = new FormData();
  formData.append('file', listFile, 'Сотрудники.xls');
  await http.post('/api/kbi/workers/upload', formData,
  {
    onSuccess: () => notify.success('Сотрудники успешно загружены'),
    onError: () => notify.error('Не удалось загрузить сотрудников'),
  });
}

function WorkerAddListDialog() {
  const { open } = useDialogState('WORKERS/CREATE_BY_LIST');

  const { mutate } = useMutation((listFile: File) => createListWorkers(listFile), {
    onSuccess: () => {
      refetchActiveQuery('WORKERS/WORKER_LIST');
      closeDialog();
    },
  });

  const handleSave = files => {
    if (files?.length) {
      mutate(files?.[0]);
    }
  };

  return (
    <DropzoneDialog
      acceptedFiles={['.xls,.xlsx']}
      filesLimit={1}
      open={open}
      onSave={handleSave}
      showPreviews
      maxFileSize={5000000}
      onClose={closeDialog}
      cancelButtonText="Отмена"
      submitButtonText="Загрузить"
      dialogTitle="Загрузите список сотрудников"
      dropzoneText="Принимаются файлы форматов .xls или .xlsx"
      getFileAddedMessage={fileName => `Файл ${fileName} успешно добавлен.`}
      getFileRemovedMessage={fileName => `Файл ${fileName} успешно удален.`}
    />
  );
}

export default WorkerAddListDialog;
