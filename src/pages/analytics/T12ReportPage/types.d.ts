type T12ReportPageQueryParams = PageViewQueryParams &
  Partial<{
    view: 'alternative' | 'standart';
    workerId: IDQueryParam;
    enterpriseId: IDQueryParam;
    constructionSiteId: IDQueryParam;
    date: string;
  }>;

type T12ReportData = {
  worker: {
    fullname: string;
    personnelNumber: string;
    position: string;
  };
  attendance: {
    kind: 'Я' | 'Н' | 'ЯН' | 'В' | 'РВ' | 'НН';
    duration: string; // hh:mm
    start: string;
    end: string;
  }[];
  hoursInFirstHalf: string;
  hoursInSecondHalf: string;
  workedInTotal: {
    totalDays: number;
    totalHours: string;
    daytimeHours: string;
    nightTimeHours: string;
    weekendHours: string;
  };
  wasAbsent: {
    totalDays: number;
    totalHours: string;
  };
  totalWeekend: number;
}[];
