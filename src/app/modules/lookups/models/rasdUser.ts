export interface rasdUser {
  id: string;
  phoneNumber: string;
  phoneNumber2: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  idNumber: string;
  email: string;
  photoId: 0;
  photo: {
    id: 0;
    imageId: string;
    name: string;
    fullLink: string;
  };
  idPhotoId: 0;
  idPhoto: {
    id: 0;
    imageId: string;
    name: string;
    fullLink: string;
  };
  appUserId: string;
  appUser: {
    id: string;
    firstName: string;
    lastName: string;
    countryId: 0;
    country: any;
    nationality: string;
    userName: string;
    roles: string;
    email: string;
  };
  isActive: true;
}
