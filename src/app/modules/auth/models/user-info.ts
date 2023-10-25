export interface UserInfo {
  id: number;
  firstName: string;
  mobileNumber: string;
  middleName: string;
  lastName: string;
  email: string;
  appUserId: string;
  appUser: null;
  attachment: Attachment[];
  photo: photo;
  countryId: number;
  isActive: boolean;
  isTakidSuperAdmin: boolean;
}

export interface photo {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}

export interface Attachment {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
  isDeleted: boolean;
  appUserId: string;
}
