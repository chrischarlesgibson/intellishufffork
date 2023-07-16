export interface IRegister {
    id?: number
    email: string
    name: string
    password: string
    role: UserRole
    status: UserStatus
    institution?: IInstitution
    isUserApproved?: boolean
}

export interface IInstitution {
    id?: number
    name: string
    type: InstitutionType;
}

export interface IUser {
    id?: any;
    email: string
    name: string
    password: string
    role: UserRole
    status: UserStatus  
    institution: IInstitution;
    tourVisited: boolean;
}

export interface Ilogin {
    email: string;
    password: string;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export enum  UserStatus {
    APPROVED = 'approved',
    PENDING = 'pending',
}

export enum InstitutionType {
    UNIVERSITY = 'university',
    SCHOOL = 'School',
    COLLEGE = 'college',
}

