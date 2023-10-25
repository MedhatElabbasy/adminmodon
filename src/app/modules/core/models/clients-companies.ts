import { FileObject } from '../../security-companies/models/company';

export interface ClientsCompanies {
  id: number;
  name: string;
  companyTypeId: number;
  commercialRegistrationNumber: string;
  activityType: string;
  email: string;
  nationalAddress: string;
  chargePerson: string;
  chargePersonPhoneNumber: string;
  cityId: number;
  appUserId: string;
  photoId: number;
  photo: FileObject;
  clientCompanyUser: null;
  isActive: boolean;
  description:string;
  aboutCompany:string;
}



