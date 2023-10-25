import { Area } from '../../lookups/models/Area';
import { City } from '../../lookups/models/city';
import { Country } from '../../lookups/models/country';
import { Lookup } from '../../lookups/models/lookup';
import { OptionSetItems } from '../../lookups/models/option-set-items';

export interface Company {
  id: number;
  name: string;
  cityId: number;
  city: City;
  areaId: number;
  area: Area;
  companyStartDate: string;
  financeYearId: number;
  financeYear: Lookup;
  timeZoneLookupId: number;
  timeZoneLookup: Lookup;
  companyScaleId: number;
  companyScale: Lookup;
  companyContactNumber: string;
  postalCode: number;
  website: string;
  socialMediaLink: string;
  socialMediaLink2: string;
  address: string;
  businessDescription: string;
  companyLogoId: number;
  companyLogo: FileObject;
  commercialRegisterId: number;
  commercialRegister: FileObject;
  accountHolderName: string;
  bankName: string;
  bankCode: string;
  taxNumber: string;
  accountName: string;
  bankBranch: string;
  iban: string;
  idProofId: number;
  idProof: FileObject;
  appUserId: string;
  appUser: AppUser;
  securitCompanyAvailableServices: SecuritCompanyAvailableService[];
  firstName: string;
  lastName: string;
  email: string;
  profileImageId: number;
  profileImage: FileObject;
  businessTypeId: number;
  businessType: Lookup;
  isApproved: boolean;
  isActive: boolean;
  isRejected: boolean;
  locationLat: string;
  locationLng: string;
  companyAvilableShifts: CompanyAvilableShift[];
  companyAvilableContractTypes: CompanyAvilableContractType[];
  licenseNumber:string;
  licenseEndDate:string;
  licenseImageId:string;
  licenseImage:string;
}

interface AppUser {
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

export interface BusinessType {
  id: number;
  isDeleted?: boolean;
  name: string;
  nameEN: string;
  description?: string;
}

export interface CompanyAvilableContractType {
  id: string;
  contractTypeId: string;
  contractType: OptionSetItems;
}

export interface CompanyAvilableShift {
  id: string;
  shiftTypeId: number;
  shiftType: BusinessType;
}

export interface SecuritCompanyAvailableService {
  id: number;
  availableServicesId: number;
  availableServices: BusinessType;
}

export interface FileObject {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}
