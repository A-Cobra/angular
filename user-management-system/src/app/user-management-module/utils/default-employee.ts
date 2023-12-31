import { Employee } from '../models/employee.interface';

export const defaultEmployee: Employee = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  profileImage: '',
  birthDate: '',
  phone: 12345,
  personalSiteUrl: '',
  about: '',
  gender: 'male',
  address: {
    country: 'none',
    state: 'none',
  },
};
