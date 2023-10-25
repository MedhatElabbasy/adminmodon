
export interface SecurityGuard {
    id: number;
    isDeleted: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    nationalID: string;
    bloodType: BusinessTypeClass;
    gender: BusinessTypeClass;
    city: AreaCity;
    jobType: JobType;
    nationality: BusinessTypeClass;
    birthDate: string;
    appUserId: string;
    appUser: SecurityGuardAppUser;
    locations: string;
    lat: string;
    lng: string;
    isActive: boolean;
    photo: IDProofClass;
    bankName: string;
    bankOwner: string;
    idPhoto: IDProofClass;
    bankNumber: string;
    iban: string;
    jobTypeId: number;
  }
  
  export interface JobType {
    id: number;
    name: string;
    nameEN: string;
    fName: string;
    fNameEN: string;
    isDeleted: boolean;
  }
  
  
export interface AreaCity {
    id: number;
    name: string;
    nameEN: string;
    isDeleted: boolean;
    countryId: number;
    country: Country;
  }
  
  export interface BusinessTypeClass {
    id: number;
    name: string;
    nameEN: string;
    isDeleted?: boolean;
    description?: string;
  }
  
  export interface IDProofClass {
    id: number;
    imageId: string;
    name: string;
    fullLink: string;
  }

  export interface Country {
    id: number;
    name: string;
    prefixCode: string;
    nameEN: string;
    regex: string;
    ioS2: string;
    isDeleted?: boolean;
    status?: boolean;
  }
  

  
export interface SecurityGuardAppUser {
    id: string;
    firstName: string;
    lastName: string;
    countryId: number;
    country: Country;
    nationality: string;
    userName: string;
    isActive: boolean;
    roles: string[];
    email: string;
  }
  