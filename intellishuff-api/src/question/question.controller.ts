import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AppConstant } from "src/universal/app.constant";
import { IQuestion, IQuestionFilter } from "./question.model";
import { QuestionService } from "./question.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller(`${AppConstant.ROUTE_PREFIX}/question`)
export class QuestionController {

    /**
     *
     */
    constructor(
        private questionSvc: QuestionService
    ) {
    }

    @Post('generateQuizResult')
    async generateQuizResult(@Body() args: IQuestion) {
        await this.questionSvc.generateQuizResult(args); 
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