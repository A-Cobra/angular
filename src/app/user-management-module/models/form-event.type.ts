import { Employee } from './employee.interface';

export type FormEvent = {
  employee: Employee;
  type: 'create' | 'update';
};
