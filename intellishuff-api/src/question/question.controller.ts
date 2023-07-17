import { Body, ClassSerializerInterceptor, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
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

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('generateQuizResult')
    async generateQuizResult(@Body() args: IQuestion) {
        await this.questionSvc.generateQuizResult(args); 
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('filterQuestions')
    async filterQuestions(@Body() args: IQuestionFilter) {
      return await this.questionSvc.filterQuestions(args);
    }
    

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('getAllQuestions')
    async getAllQuestions( ) {
        return await this.questionSvc.getAllQuestions();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('addQuestion')
    async addQuestion(@Body() args: IQuestion ) {
        
        return await this.questionSvc.addQuesition(args);
    }
}