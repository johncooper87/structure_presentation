type OptionValue = string | number;
type SelectItemValue = string | number | boolean;
type SelectValue<Multiple extends boolean> = Multiple extends true
  ? SelectItemValue[]
  : SelectItemValue;

type SelectOption = string | number | Record<string, any>;

type QueryParams = import('query-string').ParsedQuery<string | number | boolean>;

interface PageViewQueryParams extends QueryParams {
  page?: number;
  pageSize?: number;
}

interface ListViewQueryParams extends PageViewQueryParams {
  search?: string;
  order?: 'asc' | 'desc';
}

type IDQueryParam = string | string[];

interface APIResponse<Result = any> {
  result: Result;
  statusCode: number;
}

type QueryableResponse<Result = any> = APIResponse<Partial<Result>>;

interface PageResult<Data = any> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: Data[];
}

type PageResponse<Data = any> = APIResponse<PageResult<Data>>;
type QueryablePageResponse<Data = any> = APIResponse<PageResult<Partial<Data>>>;

interface CommonToolbarProps {
  disabled?: boolean;
}
