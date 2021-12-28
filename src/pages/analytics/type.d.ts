interface SiteEntryDTO {
  zoneGroupName: string;
  durationInProjectString: string;
  dateTimeBeginShift: string;
  dateTimeEndShift: string;
  shiftTimeString: string;
  dateTimeBegin: string;
  dateTimeEnd: string;
}

interface SiteEntryReport {
  workerFullName: string;
  totalDurationInProjectString: string;
  entries: SiteEntryDTO[];
}

interface WorkTimeShift {
  date: string;
  beginTimeString: string;
  endTimeString: string;
  workedTimeString: string;
  outWorkedTimeString: string;
  isCheck: boolean;
}

interface WorkTimeEntry {
  workerId: string;
  fullName: string;
  professionName: string;
  periodString: string;
  outWorkedTimeAll: string;
  workedTimeAll: string;
  workShifts: WorkTimeShift[];
}

interface SiteEntriesRequestParams {
  start: string;
  end: string;
  enterpriseId?: IDQueryParam;
  workerId: IDQueryParam;
  constructionSiteId?: IDQueryParam;
}

type SiteEntriesPageQueryParams = ListViewQueryParams &
  SiteEntriesRequestParams &
  Partial<{
    // orderBy: 'serialNumber' | 'worker' | 'enterprise';
  }>;

interface WorkTimeReportRequestParams {
  start: string;
  end: string;
  enterpriseId?: IDQueryParam;
  workerId: IDQueryParam;
  constructionSiteId?: IDQueryParam;
}

type WorkTimeReportPageQueryParams = ListViewQueryParams &
  SiteEntriesRequestParams &
  Partial<{
    // orderBy: 'serialNumber' | 'worker' | 'enterprise';
  }>;

type ZoneEntriesReportParams = Partial<{
  enterpriseId: string;
  workerId?: string;
  constructionId: string;
  zoneId?: string;
  begin: string;
  end: string;
}>;
