interface WorkerNotificationFormValues {
  constructionSiteId: string;
  workerIds: string[];
  zoneId: string;
  message: string;
}

type WorkerNotificationSubmitData = SubmitData<WorkerNotificationFormValues>;
