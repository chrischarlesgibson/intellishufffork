import { Moment } from 'moment';
import { InstitutionType } from '../../authentication/auth.model';
import { ISubject } from '../subject/subject.model';

export interface IQuestionFilter {
  institutionType?: InstitutionType;
  subject: number;
  createdOn: Date;
  collegeYear?: CollegeYear;
  schoolCLass?: SchoolCLass;
  mcqsLength?: number;
}

export interface IQuestion {
  id?: any;
  text: string;
  createdBy?: any;
  updatedBy?: any;
  createdOn?: any;
  institutionType?: InstitutionType;
  subject: ISubject;
  versionNo?: number;
  options: IOptions[];
  collegeYear?: CollegeYear;
  scchoolClass?: SchoolCLass;
}

export interface IOptions {
  text: string;
  isOptionCorrect: boolean;
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
  TENTH = 'Tenth Class',
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
