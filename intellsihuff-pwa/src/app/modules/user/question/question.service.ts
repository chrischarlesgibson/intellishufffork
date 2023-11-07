import { BaseService } from "src/app/universal/base.service";
import { IQuestion, IQuestionFilter } from "./question.model";
import { ISubject } from "../subject/subject.model";
import { IResponse } from "src/app/universal/shared.model";

export class QuestionService extends BaseService {
    /**
     *
     */
    constructor() {
        super();
        
    }


    generateQuizResult(args) {
        return this.postData<IResponse<any>>({
            url: `question/generateQuizResult`,
            body: {
                ...args
            }
        })
    }
    

    filterQuestions(args: IQuestionFilter) {
        return this.postData<IQuestion[]>({
            url: `question/filterQuestions`,
            body: {
                ...args
            }
        })
    }

    getAllQuestions() {
        return this.getData<IQuestion[]>({
            url: `question/getAllQuestions`
        });
    }

    addQuestion( args: IQuestion ) {
        return this.postData<IResponse<any>>({
            url: `question/addQuestion`,
            body: {
                ...args
            }
        });
    }
}