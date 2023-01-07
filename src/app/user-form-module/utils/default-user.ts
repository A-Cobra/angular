import { User } from '../models/user.interface';

export const defaultUser: User = {
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
