type UserListPageQueryParams = ListViewQueryParams &
  Partial<{
    fullname: string;
    enterpriseName: string;
    roleName: string;
    blocked: boolean;
    // orderBy: 'fullname' | 'gender' | 'citizenship' | 'position' | 'enterprise' | 'constructionSite';
  }>;

interface UserFormValues {
  id: string;
  blocked: boolean;
  username: string;
  roleId: number;
  enterpriseId?: string;
  lastname: string;
  firstname: string;
  middlename?: string;
  gender: 'male' | 'female';
  birthdate: string;
  email: string;
  phone?: string;
  photo?: string | File;
  constructionSiteIds?: string[];
}

type UserSubmitData = SubmitData<UserFormValues>;

interface UserPostBody {
  photo?: File;
  param: {
    login: string;
    fullName: string;
    role: string;
    enterprise: string;
    isBanned: boolean;
    eMail: string;
    phoneNumber: string;
    attributes: {
      birthday: string;
      gender: '0' | '1';
      construction_ids?: string;
    };
  };
}

type UserPutBody = UserPostBody;

interface UserListItemDTO {
  createDate: string;
  enterpriseName?: string;
  fullName: string;
  id: string;
  isBanned: boolean;
  lastChangeDate: string;
  login: string;
  positionName: string;
}

interface UserDTO {
  attributes: {
    gender: '0' | '1';
    birthday: string;
    construction_ids: string;
  };
  eMail: string;
  enterprise?: {
    id: string;
    name: string;
  };
  fullName: string;
  hasPhoto: false;
  id: string;
  isBanned: boolean;
  login: string;
  phoneNumber: string;
  role: {
    id: number;
    name: string;
  };
}
