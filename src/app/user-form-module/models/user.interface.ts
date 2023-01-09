import { Address } from './address.type';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  birthDate: string;
  phone: string;
  personalSiteUrl: string;
  about: string;
  gender: 'male' | 'female' | 'none';
  address: Address;
}
