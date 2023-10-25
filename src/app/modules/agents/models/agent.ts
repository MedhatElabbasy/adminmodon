import { City } from "../../lookups/models/city";

export interface agent {
    id: string;
    mobileNumber: string;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    idNumber: null | string;
    email: string;
    photo: Photo;
    idPhoto: Photo;
    appUser: AppUser;
    isActive: boolean;
    securityCompany:securityCompany;
    birthDate:string;
    bloodType:bloodType;
    nationalityId:string;
    nationality:nationality;
    gender:gender;
    city:City;
  }
  
  export interface AppUser {
    id: string;
    firstName: string;
    lastName: string;
    countryId: null;
    country: null;
    nationality: null;
    userName: string;
    isActive: boolean;
    roles: null;
    email: string;
  }
  
  export  interface Photo {
    id: number;
    imageId: string;
    name: string;
    fullLink: string;
  }
  
  export interface securityCompany{
    id: number;
    name: string;
    cityId: number;
    address:string;
    areaId: number;
  }

  export interface bloodType{
    id:number,
    name: string,
    nameEN: string,
    isDeleted: boolean
  }

  export interface nationality{
    id: number,
    name: string,
    nameEN: string,
    isDeleted: boolean
  }

  export interface gender{
    id: number,
    name: string,
    nameEN: string,
    isDeleted: boolean
  }

  export interface city{
    id: number,
    name: string,
    nameEN: string,
    isDeleted: boolean,
  }