export interface UserData {
  id: number;
  firstName: string;
  mobileNumber: string;
  middleName?: string;
  lastName: string;
  email: string;
  appUserId?: string;
  attachment: Attachment | any;
  countryId: number;
  isActive: boolean;
}

export interface Attachment {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
  isDeleted: boolean;
  appUserId: string;
}
