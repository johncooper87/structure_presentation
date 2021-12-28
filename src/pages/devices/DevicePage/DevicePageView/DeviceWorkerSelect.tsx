import { useForm } from 'components/Form';
import { useFieldValues } from 'hooks';
import { WorkerSelect, WorkerSelectOption, WorkerSelectProps, WorkerAvatar } from 'templates';
import styles from './styles.module.scss';

function DeviceWorkerSelect(props: WorkerSelectProps) {
  const form = useForm<DeviceFormValues>();
  const { data: workerList } = useQuery<WorkerSelectOption[]>('SELECT/WORKER');
  const [workerId, archive] = useFieldValues('workerId', 'archive');

  const worker = useMemo(() => workerList?.find(worker => worker.id === workerId), [
    workerList,
    workerId,
  ]);

  useEffect(
    () => {
      if (archive) form.change('workerId', null);
    },
    [archive]
  );

  const filter = useCallback(
    (option: WorkerSelectOption) => !option.deviceId || option.id === workerId,
    [workerId]
  );

  return (
    <span className={styles.deviceWorkerSelect}>
      <WorkerAvatar id={worker?.photo && worker?.id} />
      <WorkerSelect
        disabled={archive}
        name="workerId"
        filter={filter}
        helperText={worker?.enterpriseName}
        {...props}
      />
    </span>
  );
}

export default React.memo(DeviceWorkerSelect);
