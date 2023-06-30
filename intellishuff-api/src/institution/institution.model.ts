export interface IInstitution {
    id?: number
    name: string
    type: InstitutionType;
}

export enum InstitutionType {
    UNIVERSITY = 'university',
    SCHOOL = 'shcool',
    COLLEGE = 'college',
}

export enum CollegeYear {
    FIRSTYEAR = 'First Year',
    SECONDYEAR = 'Second Year',
}

export enum SchoolCLass {
    FIRST = 'First Class',
    SECOND = 'Second Class',
    THIRD = 'Third Class',
    FOURTH = 'Fourth Class',
    FIFTH = 'Fifth Class',
    SIXTH = 'Sixth Class',
    SEVENTH = 'Seventh Class',
    EIGHTH = 'Eighth Class',
    NINTH = 'ninth Class',
    TENTH = 'Tenth Class'
}

export enum Semisters {
    FIRST = 'First semister',
    SECOND = 'Second semister',
    THIRD = 'Third semister',
    FOURTH = 'Fourth semister',
    FIFTH = 'Fifth semister',
    SIXTH = 'Sixth semister',
    SEVENTH = 'Seventh semister',
    EIGHTH = 'Eighth semister',
}