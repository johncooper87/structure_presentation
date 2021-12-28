interface BiometryRequestFormValues {
  workerIds: string[];
  siteId?: string;
}

type BiometryRequestSubmitData = SubmitData<BiometryRequestFormValues>;

interface BiometryDTO {
  dateTimeRequest: string;
  dateTimeAnswer: string;
  enterprise: { id: string; name: string };
  worker: { id: string; name: string };
  site?: { id: string; name: string };
}
