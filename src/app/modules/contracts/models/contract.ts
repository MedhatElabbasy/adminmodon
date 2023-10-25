export interface Contract {
  id: string;
  contractNumber: null;
  securityCompanyId: number;
  securityCompany: SecurityCompany;
  clientCompany: ClientCompany;
  startDate: string;
  startDateTime: string;
  startDateSinceTime: string;
  endDate: string;
  endDateTime: string;
  endDateSinceTime: string;
  contractType: any;
  contractStatus: ContractStatus;
  securityCompanyBranchId: string;
  securityCompanyBranch: SecurityCompanyBranch;
  active: boolean;
  oldContractFile:oldContractFile;
  isOldContract:boolean;
  clientOrder:clientOrder
}

interface clientOrder{
    id: string,
    email: string,
    location: string,
    longitude: string,
    latitude: string,
    numberOfGurads: number,
    numberOfSupervisors: number,
}

interface ClientCompany {
  id: number;
  name: string;
  companyTypeId: number;
  commercialRegistrationNumber: null | string;
  activityType: string;
  email: string;
  nationalAddress: string;
  chargePerson: string;
  chargePersonPhoneNumber: string;
  cityId: number;
  appUserId: string;
  photoId: null;
}

interface ContractStatus {
  id: string;
  value: number;
  nameAr: string;
  nameEn: string;
  optionSet: null;
  color: string;
  isDefault: boolean;
}

export interface SecurityCompany {
  id: number;
  name: string;
  cityId: number;
  city: null;
  areaId: number;
  area: null;
  companyStartDate: string;
  financeYearId: number;
  financeYear: null;
  timeZoneLookupId: number;
  timeZoneLookup: null;
  companyScaleId: number;
  companyScale: null;
  companyContactNumber: string;
  postalCode: number;
  website: string;
  socialMediaLink: string;
  socialMediaLink2: string;
  address: string;
  businessDescription: string;
  companyLogoId: number;
  companyLogo: CompanyLogo;
  commercialRegisterId: number;
  commercialRegister: null;
  accountHolderName: string;
  bankName: string;
  bankCode: string;
  taxNumber: string;
  accountName: string;
  bankBranch: string;
  iban: string;
  idProofId: number;
  idProof: null;
  appUserId: string;
  appUser: null;
  securitCompanyAvailableServices: any[];
  firstName: string;
  lastName: string;
  email: string;
  profileImageId: number;
  profileImage: null;
  businessTypeId: number;
  businessType: null;
  isApproved: boolean;
  isActive: boolean;
  isRejected: boolean;
  locationLat: string;
  locationLng: string;
  overview: null | string;
  overviewEn: null | string;
  securityCompanyBranch: null;
  companyAvilableShifts: any[];
  companyAvilableContractTypes: any[];
  securityCompanyClientAttachments: any[];
}

interface CompanyLogo {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}

interface SecurityCompanyBranch {
  id: string;
  securityCompanyId: number;
  securityCompany: SecurityCompany;
  name: string;
  nameEn: string;
  overview: string;
  overviewEn: string;
  address: string;
  locationLat: string;
  locationLng: string;
  photoId: number;
  photo: null;
  stauts: boolean;
  isMainBranch: boolean;
}

interface oldContractFile{
  "id": number,
  "imageId": string,
  "name": string,
  "fullLink": string
}