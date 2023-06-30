import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindOptionsWhere, Repository, getRepository } from "typeorm";
import { Question } from "./question.entity";
import { IQuestion, IQuestionFilter } from "./question.model";
import { Institution } from "src/institution/institution.entity";
import { InstitutionType } from "src/institution/institution.model";
import { IResponse } from "src/user/user.model";
import { HelperService } from "src/universal/helper.service";



@Injectable()
export class QuestionService {

  constructor(
      @InjectRepository(Question)
          private questionRepo: Repository<Question>
          , private helperSvc: HelperService
  ) { }    

  async filterQuestions(args: IQuestionFilter):Promise<IResponse> {
    let whereCondition: FindOptionsWhere<Question> = {};
    if (args.createdOn) {
      const startOfDay = new Date(args.createdOn);
      startOfDay.setHours(0, 0, 0, 0);
    
      const endOfDay = new Date(args.createdOn);
      endOfDay.setHours(23, 59, 59, 999); 
    
      whereCondition.createdOn = Between(startOfDay, endOfDay);
    }
    
    if (args.subject) {
      whereCondition.subject =  { id: args.subject };
    }
  
    if (args.collegeYear) {
      whereCondition.collegeYear =  args.collegeYear;
    }

    if (args.schoolCLass) {
      whereCondition.schoolCLass = args.schoolCLass;
    }

    
    let limit = args.mcqsLength;


    if (limit && limit > 0) {
      const totalCount = await this.questionRepo.count({ where: whereCondition });
      limit = Math.min(limit, totalCount); // Set limit to the available count if it exceeds the total count
    }

    const quest = await this.questionRepo.find({ where: whereCondition, take: limit });
    return {
      data: quest,
      status: true,
    };
  }
      

  async getAllQuestions() {
      const questions = await this.questionRepo.find();
      return questions;
  }

  async addQuesition(question): Promise<IResponse> {
    console.log(question);
    if(!question.text) {

    }
    await this.questionRepo.save(question);
    return {
      status: true,
      message: 'Successfully added'
    };
  }

}