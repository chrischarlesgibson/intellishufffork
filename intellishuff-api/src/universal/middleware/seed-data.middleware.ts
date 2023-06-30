import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { UserRole, UserStatus } from "src/user/user.model";
import { UserService } from "src/user/user.service";
import { InstitutionType } from "../../institution/institution.model";
import { ISubject } from "src/subject/subject.model";
import { SubjectService } from "src/subject/subject.service";
import { QuestionService } from "src/question/question.service";
import { IQuestion} from "src/question/question.model";
import { Institution } from "src/institution/institution.entity";
import { InstitutionService } from "src/institution/Institution.service";

@Injectable()
export class SeedDataMiddleware implements NestMiddleware {

  constructor(private userSvc: UserService
    , private subjectSvc: SubjectService
    , private questionSvc: QuestionService
    , private institutionSvc: InstitutionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { url } = req;
      let testUser = await this.userSvc.getUserByEmail('dev.faisalK@gmail.com');
     
      if (!testUser) {
        await this.userSvc.register({
          email: 'dev.faisalK@gmail.com',
          name: 'faisal khan',
          password: 'faisal256',
          role: UserRole.ADMIN,
          status: UserStatus.APPROVED,
          tourVisited: true,
          institution: {
            type: InstitutionType.COLLEGE,
            name: 'Peshwar Model College',
          },
        });

        const inst = await this.institutionSvc.getInstById(1);

          const subject: ISubject = { 
            name: `mathematics`,
            institution: inst // Assign the Institution entity instead of the institutionType
          };
          await this.subjectSvc.addSubject(subject);
  
        const question1 = {
          text: 'What is the capital of France?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'Paris' },
            { text: 'London' },
            { text: 'Berlin' },
            { text: 'Madrid' },
          ],
        };
        await this.questionSvc.addQuesition(question1);
        
        const question2 = {
          text: 'Who painted the Mona Lisa?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'Leonardo da Vinci' },
            { text: 'Pablo Picasso' },
            { text: 'Vincent van Gogh' },
            { text: 'Michelangelo' },
          ],
        };
        await this.questionSvc.addQuesition(question2);
        
        const question3 = {
          text: 'Which planet is known as the Red Planet?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'Mars' },
            { text: 'Venus' },
            { text: 'Mercury' },
            { text: 'Jupiter' },
          ],
        };
        await this.questionSvc.addQuesition(question3);
  
        // Question 4
        const question4 = {
          text: 'What is the largest ocean in the world?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'Pacific Ocean' },
            { text: 'Atlantic Ocean' },
            { text: 'Indian Ocean' },
            { text: 'Arctic Ocean' },
          ],
        };
        await this.questionSvc.addQuesition(question4);
    
        // Question 5
        const question5 = {
          text: 'Who wrote the novel "Pride and Prejudice"?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'Jane Austen' },
            { text: 'William Shakespeare' },
            { text: 'Charles Dickens' },
            { text: 'Mark Twain' },
          ],
        };
        await this.questionSvc.addQuesition(question5);
    
        // Question 6
        const question6 = {
          text: 'What is the chemical symbol for gold?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'Au' },
            { text: 'Ag' },
            { text: 'Fe' },
            { text: 'Cu' },
          ],
        };
        await this.questionSvc.addQuesition(question6);
    
        // Question 7
        const question7 = {
          text: 'Which country won the FIFA World Cup in 2018?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'France' },
            { text: 'Brazil' },
            { text: 'Germany' },
            { text: 'Spain' },
          ],
        };
        await this.questionSvc.addQuesition(question7);
    
        // Question 8
        const question8 = {
          text: 'What is the formula for calculating the area of a circle?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'πr²' },
            { text: '2πr' },
            { text: 'πd' },
            { text: '2πd' },
          ],
        };
        await this.questionSvc.addQuesition(question8);
    
        // Question 9
        const question9 = {
          text: 'Who is the current Prime Minister of Canada?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'Justin Trudeau' },
            { text: 'Stephen Harper' },
            { text: 'Andrew Scheer' },
            { text: 'Jagmeet Singh' },
          ],
        };
        await this.questionSvc.addQuesition(question9);
    
        // Question 10
        const question10 = {
          text: 'What is the largest planet in our solar system?',
          createdOn: new Date(),
          institutionType: InstitutionType.SCHOOL,
          subject: {
            id: 1,
            name: 'mathematics1',
          },
          options: [
            { text: 'Jupiter' },
            { text: 'Saturn' },
            { text: 'Neptune' },
            { text: 'Uranus' },
          ],
        };
        await this.questionSvc.addQuesition(question10);
        
      }

    next();
  }
}
