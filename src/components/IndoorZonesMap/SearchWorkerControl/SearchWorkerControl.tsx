import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import styles from './SearchWorkerControl.module.scss';
import useStyles from './Styles';

type Props = {
  workerList: Marker[];
  selectedWorker: Marker;
  setSelectedWorker: (arg: Marker) => void;
};

const SearchWorkerControl: React.FC<Props> = ({
  workerList,
  selectedWorker,
  setSelectedWorker,
}) => {
  const classes = useStyles();

  const getInputLabel = (): string => {
    if (selectedWorker) return ' ';
    if (workerList?.length) return 'Все сотрудники';

    return 'Отсутствуют сотрудники на карте';
  };

  return (
    <Autocomplete
      className={styles.w300}
      size="small"
      value={selectedWorker || null}
        // @ts-ignore
      onChange={(_, value) => setSelectedWorker(value)}
      options={workerList}
        // @ts-ignore
      getOptionLabel={option => option?.tooltip?.fullName}
      getOptionSelected={(option, value) => option?.id === value?.id}
      noOptionsText="Отсутствуют сотрудники на карте"
      renderInput={params => (
        <TextField {...params} classes={{ root: classes.root }} placeholder={getInputLabel()} />
        )}
    />
  );
};

export default React.memo(SearchWorkerControl);
