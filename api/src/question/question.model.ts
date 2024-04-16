import {
  CollegeYear,
  IInstitution,
  InstitutionType,
  SchoolCLass,
} from '../institution/institution.model';
import { ISubject } from 'src/subject/subject.model';

export interface IQuestion {
  id?: string;
  text: string;
  options: [];
  institutionType: InstitutionType;
  institution?: IInstitution;
  subject: ISubject;
  collegeYear?: CollegeYear;
  scchoolClass?: SchoolCLass;
  createdBy?: any;
  updatedBy?: any;
  createdOn?: Date;
}

export interface IQuestionFilter {
  institutionType?: InstitutionType;
  subject: string;
  createdOn: Date;
  collegeYear?: CollegeYear;
  schoolCLass?: SchoolCLass;
  mcqsLength?: number;
}
