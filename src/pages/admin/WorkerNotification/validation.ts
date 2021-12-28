export function validateWorkerNotification({
  workerIds,
  zoneId,
  message,
}: WorkerNotificationFormValues) {
  const errors: any = {};
  if (!workerIds?.length && !zoneId) errors.__form = 'Необходимо выбрать зону или сотрудников';
  if (!message) errors.message = 'Необходимо написать сообщение';
  return errors;
}

export const validateTemplateName = (value: string) =>
  value ? undefined : 'Необходимо указать значение';
