// User types
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  profileImageUrl?: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
  role: 'citizen' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  profileImage: File | null;
}

// ID Card types
export interface IDCardDesign {
  id: number;
  name: string;
  backgroundUrl: string;
  textColor: string;
}

export interface IDCardData {
  user: UserProfile;
  designId: number;
  createdAt: string;
} 