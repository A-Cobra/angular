import { Address } from './address.type';

export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  birthDate?: Date;
  phone: number;
  personalSiteUrl: string;
  about: string;
  gender: 'male' | 'female';
  address: Address;
}
