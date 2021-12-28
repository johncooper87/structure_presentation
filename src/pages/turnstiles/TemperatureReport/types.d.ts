type TemperatureReportData = {
  dateTime: string;
  fullName: string;
  personNumber: string;
  position: string;
  temperature: number;
}[];

type TemperatureReportParams = Partial<{
  enterpriseId: string;
  constructionId: string;
  start: string;
  end: string;
}>;
