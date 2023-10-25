export interface Accident {
  id: string;
  reason: string;
  isDeleted: boolean;
  incidentTypeId: string;
  incidentType: IncidentType;
  siteLocationId: string;
  siteLocation: SiteLocation;
  description: string;
  actionToken: string;
  companySecurityGuardId: string;
  companySecurityGuard: CCompanySecurityGuard;
  incidentAttachments: IncidentAttachment[];
  siteSupervisorShiftId: string;
  siteSupervisorShift: SiteSupervisorShift;
  created: string;
  createdDateTime: string;
  sinceTime: string;
  gallery: string[]
}

export interface CCompanySecurityGuard {
  id: string;
  securityGuard: SecurityGuard;
  isActive: boolean;
  jobApplication: JobApplication;
  securityCompanyBranchId: string;
  securityCompanyBranch: CompanySecurityGuardSecurityCompanyBranch;
  securityCompanyId: number;
  securityCompany: CompanySecurityGuardSecurityCompany;
  isSuperVisor: boolean;
  isSecurityGurad: boolean;
}

export interface JobApplication {
  id: number;
  phone: string;
  notes: string;
  timeTypeId: number;
  jobAttachmentsIds: number[];
  companyJobId: number;
  securityGuardId: number;
}

export interface CompanySecurityGuardSecurityCompany {
  id: number;
  name: string;
  cityId: number;
  city: AreaCity;
  areaId: number;
  area: SecurityCompanyArea;
  companyStartDate: string;
  financeYearId: number;
  financeYear: BusinessTypeClass;
  timeZoneLookupId: number;
  timeZoneLookup: BusinessTypeClass;
  companyScaleId: number;
  companyScale: BusinessTypeClass;
  companyContactNumber: string;
  postalCode: number;
  website: string;
  socialMediaLink: string;
  socialMediaLink2: string;
  address: string;
  businessDescription: string;
  companyLogoId: number;
  companyLogo: IDProofClass;
  commercialRegisterId: number;
  commercialRegister: IDProofClass;
  accountHolderName: string;
  bankName: string;
  bankCode: string;
  taxNumber: string;
  accountName: string;
  bankBranch: string;
  iban: string;
  idProofId: number;
  idProof: IDProofClass;
  appUserId: string;
  appUser: SecurityGuardAppUser;
  securitCompanyAvailableServices: PurpleSecuritCompanyAvailableService[];
  firstName: string;
  lastName: string;
  email: string;
  profileImageId: number;
  profileImage: IDProofClass;
  businessTypeId: number;
  businessType: BusinessTypeClass;
  isApproved: boolean;
  isActive: boolean;
  isRejected: boolean;
  locationLat: string;
  locationLng: string;
  overview: string;
  overviewEn: string;
  securityCompanyBranch: SecurityCompanySecurityCompanyBranch;
  companyAvilableShifts: PurpleCompanyAvilableShift[];
  companyAvilableContractTypes: PurpleCompanyAvilableContractType[];
  securityCompanyClientAttachments: PurpleSecurityCompanyClientAttachment[];
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

export interface SecurityCompanyArea {
  id: number;
  name: string;
  nameEN: string;
  cityId: number;
  city: AreaCity;
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

export interface PurpleCompanyAvilableContractType {
  id: string;
  contractTypeId: string;
  contractType: IncidentType;
}

export interface IncidentType {
  id: string;
  value: number;
  nameAr: string;
  nameEn: string;
  optionSet: OptionSet;
  color: string;
  isDefault: boolean;
}

export interface OptionSet {
  id: string;
  name: string;
  displayNameAr: string;
  displayNameEN: string;
  optionSetItems: null[];
  isDeleted?: boolean;
}

export interface PurpleCompanyAvilableShift {
  id: string;
  shiftTypeId: number;
  shiftType: BusinessTypeClass;
}

export interface PurpleSecuritCompanyAvailableService {
  id: number;
  availableServicesId: number;
  availableServices: BusinessTypeClass;
}

export interface SecurityCompanySecurityCompanyBranch {
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
  photo: IDProofClass;
  stauts: boolean;
  isMainBranch: boolean;
}

export interface PurpleSecurityCompanyClientAttachment {
  id: string;
  photoId: number;
  photo: IDProofClass;
}

export interface CompanySecurityGuardSecurityCompanyBranch {
  id: string;
  isDeleted: boolean;
  securityCompanyId: number;
  securityCompany: SecurityCompanyBranchSecurityCompany;
  name: string;
  nameEn: string;
  overview: string;
  overviewEn: string;
  address: string;
  locationLat: string;
  locationLng: string;
  photoId: number;
  photo: SecurityCompanyBranchPhoto;
  stauts: boolean;
  isMainBranch: boolean;
}

export interface SecurityCompanyBranchPhoto {
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  id: number;
  imageId: string;
  name: string;
  isDeleted: boolean;
  appUserId: string;
}

export interface SecurityCompanyBranchSecurityCompany {
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  id: number;
  isDeleted: boolean;
  name: string;
  city: ClientCompanyCity;
  cityId: number;
  area: CompanyLogoClass;
  areaId: number;
  companyStartDate: string;
  financeYear: CompanyLogoClass;
  financeYearId: number;
  timeZoneLookup: TimeZoneLookup;
  timeZoneLookupId: number;
  companyScale: CompanyLogoClass;
  companyScaleId: number;
  companyContactNumber: string;
  postalCode: number;
  website: string;
  socialMediaLink: string;
  socialMediaLink2: string;
  address: string;
  businessDescription: string;
  companyLogoId: number;
  companyLogo: CompanyLogoClass;
  commercialRegisterId: number;
  commercialRegister: SecurityCompanyBranchPhoto;
  accountHolderName: string;
  bankName: string;
  bankCode: string;
  taxNumber: string;
  accountName: string;
  bankBranch: string;
  iban: string;
  idProof: CompanyLogoClass;
  idProofId: number;
  appUserId: string;
  appUser: ClientCompanyAppUser;
  securitCompanyAvailableServices: FluffySecuritCompanyAvailableService[];
  firstName: string;
  lastName: string;
  email: string;
  profileImageId: number;
  profileImage: CompanyLogoClass;
  businessTypeId: number;
  businessType: PurpleBusinessType;
  isActive: boolean;
  isApproved: boolean;
  isRejected: boolean;
  locationLat: string;
  locationLng: string;
  companyAvilableShifts: FluffyCompanyAvilableShift[];
  companyAvilableContractTypes: FluffyCompanyAvilableContractType[];
  securityCompanyClients: SecurityCompanyClientElement[];
  overview: string;
  overviewEn: string;
  securityCompanyClientAttachment: FluffySecurityCompanyClientAttachment[];
}

export interface ClientCompanyAppUser {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  firstName: string;
  middleName: string;
  lastName: string;
  countryId: number;
  country: Country;
  isActive: boolean;
}

export interface CompanyLogoClass {
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  nameEN?: string;
  cityId?: number;
  city?: CompanyLogoClass;
  isDeleted: boolean;
  countryId?: number;
  country?: Country;
  imageId?: string;
  appUserId?: string;
  description?: string;
}

export interface PurpleBusinessType {
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  nameEN: string;
  isDeleted: boolean;
}

export interface ClientCompanyCity {
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  nameEN: string;
  isDeleted: boolean;
  countryId: number;
  country: Country;
}

export interface FluffyCompanyAvilableContractType {
  id: string;
  isDeleted: boolean;
  contractTypeId: string;
  contractType: ContractType;
  securityCompanyId: number;
}

export interface ContractType {
  id: string;
  isDeleted: boolean;
  value: number;
  nameAr: string;
  nameEn: string;
  optionSetId: string;
  optionSet: OptionSet;
  color: string;
  isDefault: boolean;
}

export interface FluffyCompanyAvilableShift {
  id: string;
  isDeleted: boolean;
  shiftTypeId: number;
  shiftType: CompanyLogoClass;
  securityCompanyId: number;
}

export interface FluffySecuritCompanyAvailableService {
  id: number;
  isDeleted: boolean;
  securityCompanyId: number;
  availableServicesId: number;
  availableServices: PurpleBusinessType;
}

export interface FluffySecurityCompanyClientAttachment {
  id: string;
  isDeleted: boolean;
  securityCompanyId: number;
  photoId: number;
  photo: CompanyLogoClass;
}

export interface SecurityCompanyClientElement {
  id: string;
  isDeleted: boolean;
  clientCompanyId: number;
  clientCompany: PurpleClientCompany;
  securityCompanyId: number;
  securityCompanyBranchId: string;
}

export interface PurpleClientCompany {
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  id: number;
  isDeleted: boolean;
  name: string;
  companyTypeId: number;
  companyTypes: PurpleBusinessType;
  activityType: string;
  email: string;
  nationalAddress: string;
  chargePerson: string;
  chargePersonPhoneNumber: string;
  cityId: number;
  city: ClientCompanyCity;
  appUserId: string;
  appUser: ClientCompanyAppUser;
  photoId: number;
  photo: SecurityCompanyBranchPhoto;
  commercialRegistrationNumber: string;
}

export interface TimeZoneLookup {
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  id: number;
  isDeleted: boolean;
  name: string;
  nameEN: string;
  description: string;
}

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

export interface IncidentAttachment {
  id: string;
  attachmentId: number;
  attachment: IDProofClass;
}

export interface SiteLocation {
  id: string;
  isDeleted: boolean;
  name: string;
  numberOfGuards: number;
  photoId: number;
  photo: IDProofClass;
  clientSiteId: string;
  clientSite: ClientSite;
  statusId: string;
  status: IncidentType;
  locationAddress: string;
  locationLat: string;
  locationLong: string;
  locationHight: number;
}

export interface ClientSite {
  id: string;
  isDeleted: boolean;
  securityCompanyClientId: string;
  securityCompanyClient: ClientSiteSecurityCompanyClient;
  siteName: string;
  siteAddress: string;
  siteLat: string;
  siteLong: string;
  siteHight: number;
  sitePhotoId: number;
  sitePhoto: IDProofClass;
  enableGeolocation: boolean;
  geolocationLenghtInMetter: number;
  siteDescription: string;
  totalNumberOfGurds: number;
  statusId: string;
  status: IncidentType;
  siteSupervisorShifts: null[];
  siteLocations: SiteLocation[];
}
export interface SiteLocation {
  id: string;
  name: string;
  numberOfGuards: number;
  photoId: number;
  statusId: string;
  clientSiteId: string;
  locationAddress: string;
  locationLat: string;
  locationLong: string;
  locationHight: number;
  //photo: FileObject;
}


export interface ClientSiteSecurityCompanyClient {
  id: string;
  clientCompany: FluffyClientCompany;
  securityCompany: CompanySecurityGuardSecurityCompany;
  securityCompanyBranch: SecurityCompanySecurityCompanyBranch;
}

export interface FluffyClientCompany {
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
  photo: IDProofClass;
}

export interface SiteSupervisorShift {
  id: string;
  clientShiftSchedule: ClientShiftSchedule;
  companySecurityGuard: SiteSupervisorShiftCompanySecurityGuard;
  clientSite: ClientSite;
}

export interface ClientShiftSchedule {
  id: string;
  companyShiftId: string;
  companyShift: CompanyShift;
  securityCompanyClientId: string;
  securityCompanyClient: ClientSiteSecurityCompanyClient;
  shiftStartTime: string;
  shiftEndTime: string;
  schedulings: Scheduling[];
}

export interface CompanyShift {
  id: string;
  shiftType: BusinessTypeClass;
  securityCompany: CompanySecurityGuardSecurityCompany;
}

export interface Scheduling {
  id: string;
  clientShiftScheduleId: string;
  name: string;
  nameEn: string;
  isFriday: boolean;
  isMonday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isThursday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  breakScheduling: BreakScheduling[];
  guardSchedules: GuardSchedule[];
  isPerDayExtraTimeEnabled: boolean;
  perDayExtraTime: string;
  isPerWeekExtraTimeEnabled: boolean;
  perWeekExtraTime: string;
  timeForRest: boolean;
  extraTimeForVacations: boolean;
  numberOfWorkDayes: number;
}

export interface BreakScheduling {
  id: string;
  restPaymentTypeId: string;
  restPaymentType: IncidentType;
  name: string;
  nameEn: string;
  breakTime: string;
}

export interface GuardSchedule {
  id: string;
  isDeleted: boolean;
  schedulingId: string;
  siteSupervisorShiftId: string;
  companySecurityGuardId: string;
  companySecurityGuard: CCompanySecurityGuard;
}

export interface SiteSupervisorShiftCompanySecurityGuard {
  id: string;
  securityGuardId: number;
  securityGuard: SecurityGuard;
  isActive: boolean;
  guardStatusId: string;
  guardStatus: IncidentType;
}
