import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppConstant } from "src/universal/app.constant";
import { IQuestion, IQuestionFilter } from "./question.model";
import { QuestionService } from "./question.service";
import { SubjectService } from "src/subject/subject.service";
import { ISubject } from "src/subject/subject.model";

@Controller(`${AppConstant.ROUTE_PREFIX}/question`)
export class QuestionController {

    /**
     *
     */
    constructor(
        private questionSvc: QuestionService
    ) {
    }

    @Post('filterQuestions')
    async filterQuestions(@Body() args: IQuestionFilter) {
      return await this.questionSvc.filterQuestions(args);
    }
    

    @Get('getAllQuestions')
    async getAllQuestions( ) {
        return await this.questionSvc.getAllQuestions();
    }

    @Post('addQuestion')
    async addQuestion(@Body() args: IQuestion ) {
        
        return await this.questionSvc.addQuesition(args);
    }
}