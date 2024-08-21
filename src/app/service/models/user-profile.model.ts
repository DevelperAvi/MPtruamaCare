export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender: string;
  emailAddress: string;
  phoneNumber: string;
  specialization: string;
  medicalLicenseNumber: string;
  qualifications: string;
  yearsOfExperience?: number;
  hospitalAffiliation: string;
  address: string;
  profilePicture: string;
  userType: string;
  createdAt: Date;
  updatedAt: Date;
  isUpdated: boolean;
}
