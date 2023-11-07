import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserStatus } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { InstitutionType } from '../../institution/institution.model';
import { ISubject } from 'src/subject/subject.model';
import { SubjectService } from 'src/subject/subject.service';
import { QuestionService } from 'src/question/question.service';
import { InstitutionService } from 'src/institution/Institution.service';
import * as moment from 'moment';
import { Role } from 'src/role/role/role.entity';
import { RoleService } from 'src/role/role/role.service';

@Injectable()
export class SeedDataMiddleware implements NestMiddleware {
  constructor(
    private userSvc: UserService,
    private subjectSvc: SubjectService,
    private questionSvc: QuestionService,
    private institutionSvc: InstitutionService,
    private roleSvc: RoleService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { url } = req;
    let testUser = await this.userSvc.getUserByEmail('dev.faisalK@gmail.com');

    if (!testUser) {
      const admin = {
        role: 'admin',
      };
      const user = {
        role: 'user',
      };

      await this.roleSvc.addRole(admin);
      await this.roleSvc.addRole(user);

      const roles = await this.roleSvc.findRoles();
      await this.userSvc.register({
        email: 'dev.faisalK@gmail.com',
        name: 'faisal khan',
        password: '</>Intellishuff256',
        roles: roles as any, // Pass an array of role names
        status: UserStatus.APPROVED,
        tourVisited: true,
        institution: {
          type: InstitutionType.COLLEGE,
          name: 'Peshwar Model College',
        },
      });

      const inst = await this.institutionSvc.getFirstIns();
      const subject: ISubject = {
        name: `mathematics`,
        institution: inst,
      };
      await this.subjectSvc.addSubject(subject);
      const sub = await this.subjectSvc.getFirstSub();

      const localDateTime = moment().format('MM/DD/YY');
      const question1 = {
        text: 'What is the capital of France?',
        createdOn: localDateTime,
        institutionType: InstitutionType.SCHOOL,
        subject: {
          id: sub[0].id,
          name: 'mathematics',
        },
        options: JSON.stringify([
          { text: 'Paris', isOptionCorrect: true },
          { text: 'London', isOptionCorrect: false },
          { text: 'Berlin', isOptionCorrect: false },
          { text: 'Madrid', isOptionCorrect: false },
        ]),
      };
      await this.questionSvc.addQuesition(question1);

      const question2 = {
        text: 'Who painted the Mona Lisa?',
        createdOn: localDateTime,
        institutionType: InstitutionType.SCHOOL,
        subject: {
          id: sub[0].id,
          name: 'mathematics',
        },
        options: JSON.stringify([
          { text: 'Leonardo da Vinci', isOptionCorrect: true },
          { text: 'Pablo Picasso', isOptionCorrect: false },
          { text: 'Vincent van Gogh', isOptionCorrect: false },
          { text: 'Michelangelo', isOptionCorrect: false },
        ]),
      };
      await this.questionSvc.addQuesition(question2);

      const question3 = {
        text: 'Which planet is known as the Red Planet?',
        createdOn: localDateTime,
        institutionType: InstitutionType.SCHOOL,
        subject: {
          id: sub[0].id,
          name: 'mathematics',
        },
        options: JSON.stringify([
          { text: 'Mars', isOptionCorrect: true },
          { text: 'Venus', isOptionCorrect: false },
          { text: 'Mercury', isOptionCorrect: false },
          { text: 'Jupiter', isOptionCorrect: false },
        ]),
      };
      await this.questionSvc.addQuesition(question3);

      const question4 = {
        text: 'What is the largest ocean in the world?',
        createdOn: localDateTime,
        institutionType: InstitutionType.SCHOOL,
        subject: {
          id: sub[0].id,
          name: 'mathematics',
        },
        options: JSON.stringify([
          { text: 'Pacific Ocean', isOptionCorrect: true },
          { text: 'Atlantic Ocean', isOptionCorrect: false },
          { text: 'Indian Ocean', isOptionCorrect: false },
          { text: 'Arctic Ocean', isOptionCorrect: false },
        ]),
      };
      await this.questionSvc.addQuesition(question4);

      const question5 = {
        text: 'Who wrote the novel "Pride and Prejudice"?',
        createdOn: localDateTime,
        institutionType: InstitutionType.SCHOOL,
        subject: {
          id: sub[0].id,
          name: 'mathematics',
        },
        options: JSON.stringify([
          { text: 'Jane Austen', isOptionCorrect: true },
          { text: 'William Shakespeare', isOptionCorrect: false },
          { text: 'Charles Dickens', isOptionCorrect: false },
          { text: 'Mark Twain', isOptionCorrect: false },
        ]),
      };
      await this.questionSvc.addQuesition(question5);

      const question6 = {
        text: 'What is the chemical symbol for gold?',
        createdOn: localDateTime,
        institutionType: InstitutionType.SCHOOL,
        subject: {
          id: sub[0].id,
          name: 'mathematics',
        },

        options: JSON.stringify([
          { text: 'Au', isOptionCorrect: true },
          { text: 'Ag', isOptionCorrect: false },
          { text: 'Fe', isOptionCorrect: false },
          { text: 'Cu', isOptionCorrect: false },
        ]),
      };
      await this.questionSvc.addQuesition(question6);

      const question7 = {
        text: 'Which country won the FIFA World Cup in 2018?',
        createdOn: localDateTime,
        institutionType: InstitutionType.SCHOOL,
        subject: {
          id: sub[0].id,
          name: 'mathematics',
        },
        options: JSON.stringify([
          { text: 'France', isOptionCorrect: true },
          { text: 'Brazil', isOptionCorrect: false },
          { text: 'Germany', isOptionCorrect: false },
          { text: 'Spain', isOptionCorrect: false },
        ]),
      };
      await this.questionSvc.addQuesition(question7);

      const question8 = {
        text: 'What is the formula for calculating the area of a circle?',
        createdOn: localDateTime,
        institutionType: InstitutionType.SCHOOL,
        subject: {
          id: sub[0].id,
          name: 'mathematics',
        },
        options: JSON.stringify([
          { text: 'πr²', isOptionCorrect: true },
          { text: '2πr', isOptionCorrect: false },
          { text: 'πd', isOptionCorrect: false },
          { text: '2πd', isOptionCorrect: false },
        ]),
      };
    }

    next();
  }
}
