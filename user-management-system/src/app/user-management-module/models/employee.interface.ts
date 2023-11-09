import { Address } from './address.type';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  birthDate: string;
  phone: number;
  personalSiteUrl: string;
  about: string;
  gender: 'male' | 'female' | 'none';
  address: Address;
}
