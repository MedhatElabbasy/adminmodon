import { Company, FileObject } from './company';
export interface Client {
    id: string;
    clientCompany: ClientCompany;
    securityCompany: Company;
    securityCompanyBranch: Branch;
  }
  

  export interface Branch {
    id: string;
    securityCompanyId: number;
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

export interface ClientCompany {
    id: number;
    name: string;
    companyTypeId: number;
    commercialRegistrationNumber: number;
    activityType: string;
    email: string;
    nationalAddress: string;
    chargePerson: string;
    chargePersonPhoneNumber: string;
    cityId: number;
    appUserId: string;
    photoId: null;
    photo: FileObject;
}
