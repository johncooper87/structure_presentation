import { Box, Button } from '@material-ui/core';
import BiometryIcon from '@material-ui/icons/Fingerprint';
import ProgressBar from 'components/inputs/ProgressBar';
import BiometryRequestDialog from 'pages/admin/Biometry/BiometryRequestDialog';
import React, { useState } from 'react';
import { http } from 'utils';
import styles from './BiometryWidget.module.scss';

type LastBiometryData = {
  workerCount: number;
  confirmCount: number;
  expectCount: number;
};

const getLastBiometryData = async (siteId: string) => {
  const response: LastBiometryData | Response = await http.get(
    '/api/kbi/biometric/getlastrequestbiometric',
    { siteId }
  );
  if (response instanceof Response && response.status === 204) return null;
  return response as LastBiometryData;
};

function BiometryWidget({ siteId }: { siteId?: string }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [queryEnabled, setQueryEnabled] = useState(Boolean(siteId));

  const { data } = useQuery<LastBiometryData>(
    ['WIDGET/LAST_BIOMETRY', siteId],
    () => getLastBiometryData(siteId),
    {
      refetchInterval: 10 * 1000,
      enabled: queryEnabled,
      keepPreviousData: false,
      initialData: {
        workerCount: 0,
        confirmCount: 0,
        expectCount: 0,
      },
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setQueryEnabled(true), [siteId]);
  useMemo(() => {
    if (data === null) setQueryEnabled(false);
  }, [data]);

  const handleRequestBiometry = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const handleSuccess = () => setQueryEnabled(true);

  return (
    <>
      <BiometryRequestDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSuccess={handleSuccess}
        queryName="WIDGET/LAST_BIOMETRY"
        siteId={siteId}
      />
      <Box className={styles.container}>
        <Box className={styles.title}>Общий запрос</Box>

        <Box className={styles.text}>
          Выбрано рабочих:
          <span className={styles.link}>{data?.workerCount || 0}</span>
        </Box>
        <Button
          color="default"
          className={styles.btn}
          startIcon={<BiometryIcon />}
          onClick={handleRequestBiometry}
        >
          Запросить биометрию
        </Button>

        <Box className={styles.text}>Статус:</Box>

        <Box className={styles.list}>
          Подтвердили {'  '}
          <span className={styles.link}>{data?.confirmCount || 0}</span>
          <ProgressBar
            percentage={(data?.confirmCount / data?.workerCount) * 100 || 0}
            color="#478DD1"
          />
        </Box>

        <Box className={styles.list}>
          Не подтвердили {'  '}
          <span className={styles.link}>{data?.expectCount || 0}</span>
          <ProgressBar
            percentage={(data?.expectCount / data?.workerCount) * 100 || 0}
            color="#478DD1"
          />
        </Box>
      </Box>
    </>
  );
}

export default BiometryWidget;
