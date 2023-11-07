import { BaseService } from "src/app/universal/base.service";
import { ISubject } from "./subject.model";
import { IResponse } from "src/app/universal/shared.model";



export class SubjectService extends BaseService {
  /**
   *
   */
  constructor() {
   super(); 
  }
  
  getAllSubjects() {
    return this.getData<any>({
        url: `subject/getAllSubjects`
    }).then(data => {
      return data.sort((a:any, b:any) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    })  
  }

  deleteSubject(arsgs) {
    return this.postData({
      url: `subject/deleteSubject`,
      body: {
        ...arsgs
      }
    })
  }

  updateSubject(args: ISubject) {
    return this.postData<IResponse<any>>({
      url: `subject/updateSubject`,
      body: {
        ...args
      }
    })
  }

  addSubject(args: ISubject) {
    return this.postData<IResponse<any>>({
        url: `subject/addSubject`,
        body: {
            ...args
        }
    })
}
}