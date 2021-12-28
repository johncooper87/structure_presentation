type WorkerListPageQueryParams = ListViewQueryParams &
  Partial<{
    gender: 'male' | 'female';
    citizenship: string;
    position: string;
    insuranceNumber: string;
    fullname: string;
    enterpriseId: IDQueryParam;
    constructionSiteId: IDQueryParam;
    orderBy: 'fullname' | 'gender' | 'citizenship' | 'position' | 'enterprise' | 'constructionSite';
  }>;

interface WorkerFormValues {
  id: string;
  lastname: string;
  firstname: string;
  middlename?: string;
  gender: 'male' | 'female';
  birthdate: string;
  enterpriseId: string;
  siteIds: string[];
  stationary: boolean;
  citizenship?: string;
  insuranceNumber?: string;
  passport?: string;
  photo?: string | File;
  positionId: string;
  comment?: string;
  deviceId?: string;
}

type WorkerSubmitData = SubmitData<WorkerFormValues>;

interface WorkerPostBody {
  photo?: File;
  param: {
    name: string;
    fullName: string;
    enterprise: string;
    profession: string;
    device?: string;
    attributes: {
      gender: Gender;
      construction_name: string;
      birthday: string;
      citizenship?: string;
      insurance?: string;
      passport?: string;
      isStationary: WorkerStationarity;
      comment?: string;
    };
  };
}

type WorkerPutBody = WorkerPostBody;
