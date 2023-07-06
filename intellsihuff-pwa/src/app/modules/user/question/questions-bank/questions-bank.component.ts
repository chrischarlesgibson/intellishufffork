import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuestionService } from '../question.service';
import { SubjectService } from '../../subject/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollegeYear, IOptions, IQuestion, SchoolCLass, Semisters } from '../question.model';

import { jsPDF } from "jspdf";
import { ISubject } from '../../subject/subject.model';
import { UserSettingService } from '../../user-setting.service';
import { BasePage } from 'src/app/universal/base.page';
import { NavigationExtras } from '@angular/router';
import { SharedService } from '../shared.service';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { IUser, InstitutionType } from 'src/app/modules/authentication/auth.model';
@Component({
  selector: 'questions-bank',
  templateUrl: './questions-bank.component.html',
  styleUrls: ['./questions-bank.component.scss']
})
export class QuestionsBankComponent extends BasePage implements OnInit {
  formGroup: FormGroup

  questions: IQuestion[] = [];
  questionsCount: any;
  totalQuestions: number = 0;
  subjects: ISubject[];
  InstitutionType = InstitutionType;
  shuffled: IQuestion[] = [];
  currentUser: IUser | null;
  SchoolCLass = SchoolCLass;
  Semisters = Semisters;
  Year = CollegeYear;

  faFilter = faFilter;

  getLetter(index: number): string {
    return String.fromCharCode(97 + index);
  }
  
  constructor(
    private questionSvc: QuestionService
    , private subjectSvc: SubjectService
    , private formBuilder: FormBuilder
    , private userSettingSvc: UserSettingService
    , private sharedService: SharedService
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      subject: [null, Validators.required],
      institutionType: [null, Validators.required],
      createdOn: [null, ],
      versions: [null, [Validators.max(100)]],
      collegeYear: [null, ],
      SchoolCLass: [null, ],
      mcqsLength: [null, ]
    })
   }  

  async ngOnInit() {
    await this._getCurrentUser();
    this.subjects = await this.subjectSvc.getAllSubjects();
  }

  onPrepareLinkClicked() {
    this.sharedService.setMcqs([...this.shuffled]);
    this.router.navigate(['/home/quiz']);
  }

  onAddQuestionsClicked() {
    this.router.navigate(['/home/add-questions']);
  }

  async onGenerateVersionsCLicked() {
    this._generateVersions();
  }

  async onEexportPdfClicked() {
    // const loader = await this.helperSvc.loader;
    // await loader.present();

    try {

      await this._exportPdf();
      
    } catch (error) {
    } finally {
      // await loader.dismiss();
    }
  }

  onResteFilterClicked() {
    this.formGroup.reset();
  }

  async onFilterClicked(data: any) {
    if(!data.subject) {
      return;
    }
    
    const date = this.helperSvc.formatDate(this.formGroup.controls['createdOn'].value);
    data.createdOn = date;

    this.helperSvc.presentLoader('Filtering Questions');
    try {
      const resp:any = await this.questionSvc.filterQuestions(data);
      if(resp.message) {
        this.helperSvc.presentAlert(resp.message, 'warning');
        return;
      }

      this.questions = resp.data;
      this.questions.forEach((question:any) => {
        question.options = JSON.parse(question.options);
      });

      this.shuffled = this.questions;
      this.getQuestionsCount();
      
    } catch (error) {
      
    } finally {
      this.helperSvc.dismissLoader();
    }
  }

  getQuestionsCount() {
    this.questionsCount = this.questions.length;
    this.totalQuestions = this.shuffled.length;
  }

  onDltMcqCicked( index: number) {
    this.questions.splice(index, 1);
    // this.shuffled = this.mcqs;
    this.getQuestionsCount();
  }

  shuffleArray(array: IQuestion[]) {
    const generatedRandomNumbers:any = [];
    const arrayLength = array.length;
    for (let i = arrayLength - 1; i >= 0; i--) {
      const j = this._generateRandomNumber(generatedRandomNumbers, arrayLength, i);
      if(i == j) {
        console.log('macthed');
      }
      generatedRandomNumbers.push(j);
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
  
  shuffleOptions(mcqs: IQuestion[]) {
    for (const mcq of mcqs) {
      const shuffledOptions: IOptions[] = [];
      
      const tempOptions = [...mcq.options];

      while (tempOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * tempOptions.length);
        const randomOption = tempOptions.splice(randomIndex, 1)[0];
        shuffledOptions.push(randomOption);
      }

      // Replace the original options with the shuffled options
      mcq.options = shuffledOptions;
    }

    return mcqs;
  }
  

  private async _generateVersions() {
    const versions = this.formGroup.controls['versions'].value;
    
    this.shuffled = [];
    for (let index = 1; index <= versions; index++) {
      const filteredMcqs = this.questions.map(x => ({ ...x, versionNo: index }));
      
      const shuffledArray =  this.shuffleArray([...filteredMcqs]);
      const mcqsShuffled = this.shuffleOptions([...shuffledArray]);
      this.shuffled = this.shuffled.concat(mcqsShuffled);
    }
    this.getQuestionsCount();

  }


  private async _exportPdf() {
    return new Promise<void>((resolve ) =>{
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
      });
      const margin = 30;
      const pageWidth = doc.internal.pageSize.width - 2 * margin;
      const pageHeight = doc.internal.pageSize.height - 2 * margin;
      let currentPage = 1;
      let yPos = margin;
      const studentId = "__________"; // Static student ID
      const subject = this.subjects.find(s => {
        return s.id == this.formGroup.controls['subject'].value;
      });
      const courseName:any = subject?.name; // Static course name
      let institutionName: any = this.currentUser?.institution.name;
   
      this.shuffled.forEach((m, index) => {
        // Check if it is the beginning of a new set
        const isBeginningOfSet  =  index % this.questionsCount === 0 ? true : false;
        if (isBeginningOfSet) {
          doc.addPage();
          currentPage++;
          yPos = margin;
          // const underlineY = margin + 2; // Adjust the value to position the underline appropriately

          // Print institution name
          const institutionNameWidth = doc.getTextWidth(institutionName) ;
          const institutionNameX = (pageWidth - institutionNameWidth) / 2;
          const institutionNameY = margin;
          doc.setFontSize(15);
          doc.setFont("bold");
          const institutionNameDimensions = doc.getTextDimensions(institutionName);
          doc.text(institutionName, institutionNameX, institutionNameY);

          // Calculate underline position and width based on the dimensions of the institution name
          const underlineY = institutionNameY + 2; // Adjust the value to position the underline appropriately
          const underlineWidth = institutionNameDimensions.w;
          doc.setDrawColor(0, 0, 0); // Set the color of the underline (black in this case)
          doc.setLineWidth(1); // Set the width of the underline
          doc.line(institutionNameX, underlineY, institutionNameX + underlineWidth, underlineY);
          yPos += 30;


          // Print student ID
          doc.setFontSize(10);
          doc.setFont("normal");
          doc.text(`Student ID: ${studentId}`,  margin, yPos, {
            align: "left",
          });
          // yPos += 30;
          const courseNameWidth = doc.getTextWidth(courseName);
          const courseNameX = (pageWidth - courseNameWidth) / 2;
          doc.setFontSize(15);
          doc.setFont("bold");
          // Print course name
          doc.text(`${courseName}`,  courseNameX, yPos, {
            align: "left",
          });
          yPos += 30;
        }
        

        // const question = `${index + 1}. ${m.q}`;
        let question:any = null;
        if ((index +1 ) % this.questionsCount > 0) {
          question =
            index +1 > this.questionsCount
              ? `${(index +1 ) % this.questionsCount}: ${m.text}`
              : `${index +1 }: ${m.text}`;
        } else {
          question = `${this.questionsCount}: ${m.text}`;
        }
    
        const options = m.options.map((option:any, index:any) => {
          return { key: String.fromCharCode(97 + index), text: option.text };
        });
    
        // Print question
        doc.setFontSize(12);
        doc.setFont("bold");
        const questionLines = doc.splitTextToSize(question, pageWidth);
        const questionHeight = questionLines.length * 20;
        
        // Check if there is enough space for the MCQ block on the page
        if (yPos + questionHeight + options.length * 20 > pageHeight) {
          doc.addPage();
          currentPage++;
          yPos = margin;
        }
        
        doc.text(questionLines, margin, yPos);
        yPos += questionHeight;
    
        // Print answer options
        doc.setFontSize(10);
        doc.setFont("normal");
        const optionMaxWidth = pageWidth - 2 * margin;
        const optionMarginLeft = 10; // Increase the left-side margin for options
        options.forEach((option: any) => {
          const optionText = `${option.key}. ${option.text}`;
          const optionLines = doc.splitTextToSize(optionText, optionMaxWidth);
          // remove optionMarginLeft to fix mcq fitting issue 
          doc.text(optionLines, margin + optionMarginLeft, yPos);
          yPos += 20 * optionLines.length;
        });
    
        yPos += 10;
    
        // Check if there is enough space for the next MCQ on the page
        if (yPos + 60 > pageHeight) {
          doc.addPage();
          currentPage++;
          yPos = margin;
        }

        // addWatermark(watermarkText);

      });
    
      doc.save("mcqs.pdf");
      resolve();
    });
  } 
  
  private _generateRandomNumber(usedNumbers: any, max: any, currentNum: number) {
    const maxAttempts = 100; // Maximum number of attempts to find a unique random number
    let attempts = 0;
  
    while (attempts < maxAttempts) {
      const randomNumber = Math.floor(Math.random() * max);
  
      if (!usedNumbers.includes(randomNumber) && currentNum !== randomNumber) {
        return randomNumber;
      }
  
      attempts++;
    }
  
    // If a unique random number cannot be found within the maximum attempts, use a fallback approach
    const unusedNumbers = Array.from(Array(max).keys()).filter(num => !usedNumbers.includes(num) && num !== currentNum);
    if (unusedNumbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * unusedNumbers.length);
      return unusedNumbers[randomIndex];
    }
  
    // If no unused numbers are available, return the current number as a fallback
    return currentNum;
  }
  
  private async _getCurrentUser() {
    const user: any = await this.userSettingSvc.getCurrentUser();
    this.currentUser = user;
  }

}
