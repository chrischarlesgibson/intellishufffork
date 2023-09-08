import {
  IInstitution,
  InstitutionType,
} from 'src/institution/institution.model';

export interface IRegistrationParams {
  id?;
  email: string;
  name: string;
  password: string;
  roles?: string[];
  status?: UserStatus;
  institution: IInstitution;
  tourVisited?: boolean;
}

export interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
  roles: IRole[];
  status: UserStatus;
  institution: IInstitution;
  tourVisited: boolean;
}

// export interface IRole {
//     id?: number
//     type: UserRole
// }

export interface IResponse<T> {
  data?: T;
  status?;
  message?;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRole {
  role: string;
}

export enum UserStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
}
