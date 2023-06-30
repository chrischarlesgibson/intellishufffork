import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../subject/subject.service';
import { QuestionService } from '../question.service';
import { HelperService } from 'src/app/universal/helper.service';
import { CollegeYear, IQuestion, SchoolCLass, Semisters } from '../question.model';
import { IUser, InstitutionType } from '../../authentication/user.model';
import { UserSettingService } from '../../user-setting.service';


@Component({
  selector: 'add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  mcqFormGroup: FormGroup;
  aboutQuestionFg: FormGroup;

  currentUser: IUser;
  subjects: any;
  InstitutionType = InstitutionType;
  Year = CollegeYear;
  SchoolCLass = SchoolCLass;
  Semisters = Semisters;
  optionsForm: FormGroup;
  addSubjectFg: FormGroup;
  docxText: string;
 
  get optionControls() {
    return (this.mcqFormGroup.get('options') as FormArray).controls;
  }

  constructor(
    private formBuilder: FormBuilder
    , private questionSvc: QuestionService
    , private userSettingSvc: UserSettingService
    , private subjectSvc: SubjectService
    , private helperSvc: HelperService  
  ) {
    this.mcqFormGroup = this.formBuilder.group({
      questionText: [null, Validators.required],
      options: this.formBuilder.array([]) // Initialize the options array
    });

    this.aboutQuestionFg = this.formBuilder.group({
      subject:  [null, Validators.required],
      // institutionType:  [null, Validators.required],
      collegeYear: [null, ],
      scchoolClass: [null, ]
    });

    this.addSubjectFg = this.formBuilder.group({
      name: [null, Validators.required],
    });
   }

  async ngOnInit() {
    await this._getCurrentUser();
    await this._getAllSubjects();
    this.addOption();
  }

  addOption() {
    const optionFormGroup = this.formBuilder.group({
      text: [null, Validators.required],
      isOptionCorrect: [null, Validators.required]
    }); 
    (this.mcqFormGroup.get('options') as FormArray).push(optionFormGroup);
  }

  updateOptionSelection(selectedIndex: number) {
    const optionsArray = this.mcqFormGroup.get('options') as FormArray;
    const selectedOption = optionsArray.at(selectedIndex);
  
    if (selectedOption) {
      optionsArray.controls.forEach((option, index) => {
        if (index !== selectedIndex) {
          option.patchValue({ isOptionCorrect: false });
        } else {
          const isOptionCorrectControl = option.get('isOptionCorrect');
          if (isOptionCorrectControl) {
            const isOptionCorrect = isOptionCorrectControl.value;
            if (!isOptionCorrect) {
              option.patchValue({ isOptionCorrect: true });
            }
          }
        }
      });
    }
  }
  
  
  


  async onAddSubjectClicked(data: any) {
    // const loader = await this.helperSvc.loader;
    // await loader.present();
    
    //TODO: subject name should be saved in lowercase
    try {
      const resp = await this.questionSvc.addSubject(data);   
      await this._getAllSubjects();
      if(resp.status) {
        this.helperSvc.presentAlert(resp.message, 'success');
      } else {
        this.helperSvc.presentAlert(resp.message, 'warning');
      }

    } catch (error) {
      
    }  finally {
      // await loader.dismiss();
    }
  }

  async onSubmitClicked(mcq: any) {
    // const loader = await this.helperSvc.loader;
    // await loader.present();

    const question: IQuestion = {
      text: mcq.questionText,
      createdBy: this.currentUser,
      updatedBy: null,
      createdOn: new Date(),
      subject: this.aboutQuestionFg.controls['subject'].value,
      options: this.mcqFormGroup.value.options,
      institutionType: this.currentUser?.institution.type,
      collegeYear: this.aboutQuestionFg.controls['collegeYear'].value ,
      scchoolClass: this.aboutQuestionFg.controls['scchoolClass'].value ,
    }
    console.log(question);
    
    try {
      const resp = await this.questionSvc.addQuestion(question);
      if(resp.status) {
        this.helperSvc.presentAlert(resp.message, 'success');
      }
    } catch (error) {
      
    } finally {
      // await loader.dismiss();
    }
    this.mcqFormGroup.reset();
      
  }

  private async _getCurrentUser() {
    const user: any = await this.userSettingSvc.getCurrentUser();
    this.currentUser = user;
  }

  private async _getAllSubjects() {
    this.subjects = await this.subjectSvc.getAllSubjects();

  }  
}
