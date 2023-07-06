import { IInstitution, InstitutionType } from "src/institution/institution.model"

export interface IRegistrationParams {
    id? 
    email: string
    name: string
    password: string
    role: UserRole
    status: UserStatus
    institution?: IInstitution
    tourVisited?: boolean;
}

export interface IUser {
    id?: number
    email: string
    name: string
    password: string
    role: UserRole
    status: UserStatus
    institution: IInstitution
    tourVisited: boolean;
}

// export interface IRole {
//     id?: number
//     type: UserRole
// }

export interface IResponse {
    data?,
    status?,
    message?
}

export interface ILoginParams {
    email: string
    password: string
}

export enum  UserRole {
    ADMIN = 'admin',
    USER = 'user'
} 

export  enum  UserStatus {
    APPROVED = 'approved',
    PENDING = 'pending',
}
