type PieDataItem = { name: string; count: number };
type PieData = PieDataItem[];

type ByDepartmentDataItem = {
  name: string
  count: number
  nestedCount: number
  subDepartments: ByDepartmentDataItem[]
}

type SiteAnalyticsVariant = 'perday' | 'forperiod';

type SiteAnalyticsParams = Partial<{
  variant: SiteAnalyticsVariant;
  enterpriseId: string;
  constructionId: string;
  date: string;
  start: string;
  end: string;
}>;

interface SiteAnalyticsDataPerDay {
  total: number;
  perDay: number;
  now: number;
  notInstructed: number;
  withHighTemperature: number;
  byDepartment: ByDepartmentDataItem[];
  byPosition: PieData;
  entries: {
    fullname: string;
    position: string;
    department: string;
    temperature: number;
    instructed: boolean;
    entered: string;
    exited: string;
  }[];
}

interface Temperature {
  value: number;
  elevated: boolean;
}

interface SiteAnalyticsPerDayChartProps {
  title: string;
  data: (PieDataItem & ByDepartmentDataItem)[];
  colorShift: number;
}

interface SiteAnalyticsForPeriodChartProps {
  dataSets: number[][];
  ticks: string[];
  labels: string[];
  colors: string[];
}

interface SiteAnalyticsDataForPeriod {
  total: number;
  avrForPeriod: number;
  notInstructed: number;
  withHighTemperature: number;
  byDateTime: {
    dateTime: string;
    attended: number;
    notInstructed: number;
    withHighTemperature: number;
  }[];
  entries: {
    fullname: string;
    position: string;
    department: string;
    temperature: number;
    instructed: boolean;
    entered: string;
    exited: string;
  }[];
}

type SiteAnalyticsData = SiteAnalyticsDataPerDay | SiteAnalyticsDataForPeriod;
