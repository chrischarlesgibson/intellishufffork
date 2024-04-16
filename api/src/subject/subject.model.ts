import { Institution } from 'src/institution/institution.entity';
import { InstitutionType } from 'src/institution/institution.model';

export interface ISubject {
  id?: string;
  name: string;
  institution?: any;
}
