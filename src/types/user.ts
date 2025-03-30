export interface User {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  customerType: 'Corporate' | 'Private';
  companyName?: string;
  companyAddress?: string;
  companyAddressField2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  activeStatus?: 0 | 1;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserGroup {
  name: string;
  privileges: string[];
}