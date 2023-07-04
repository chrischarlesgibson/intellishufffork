import { AfterViewChecked, AfterViewInit, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/universal/base.page';
import { IOptions, IQuestion } from '../question.model';
import { SharedService } from '../shared.service';

import * as moment from 'moment'; 
import { QuestionService } from '../question.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent extends BasePage implements OnInit, OnDestroy {
  quizMcqs: IQuestion[] = [];
  userSolvedMcqs: IQuestion[] = [];

  currentQuestionIndex: number = 0; // Index of the currently displayed MCQ
  timer: any = null;

  correctCount: number = 0;
  wrongCount: number = 0;

  private timerInterval: any; // Variable to store the timer interval
  private _subscription: Subscription;

  getLetter(index: number): string {
    return String.fromCharCode(97 + index);
  }

  constructor(
    private sharedSvc: SharedService,
    private questionSvc: QuestionService) {
    super();
  }

  ngOnInit(): void {
    this.sharedSvc.mcqs$.subscribe(mcqs => {
      if (mcqs) {
        this.quizMcqs = mcqs;
        this.quizMcqs.filter(m => {
          m.options.map(o => {
            o.isOptionCorrect = false;
          });
        });
      }
    });

    this._startTimer();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  handleElseRendered() {
    console.log('else fired');
  }

  async nextQuestion(currentMcq?) {
    this.userSolvedMcqs.push(currentMcq);
    
    if(this.quizMcqs.length == this.userSolvedMcqs.length) {

      this._subscription = this.sharedSvc.mcqs$.subscribe(mcqs => {
        if (mcqs) {
          this.quizMcqs = mcqs;
          for (const userMcq of this.userSolvedMcqs) {
            const quizMcq = this.quizMcqs.find(q => q.id === userMcq.id);
            if (quizMcq) {
              // Find the index of the selected option in the user's answer
              const selectedOptionIndex = userMcq.options.findIndex(option => option.isOptionCorrect);

              // Check if the selected option matches the correct option in the quiz MCQ
              if (selectedOptionIndex !== -1 && selectedOptionIndex === quizMcq.options.findIndex(option => option.isOptionCorrect)) {
                this.correctCount++;
              } else {
                this.wrongCount++;
              }
            }
          }

          this.helperSvc.presentAlert(`Your score is ${this.correctCount}`, '',5000 );
          return;
        }
      });
    }    
    this.currentQuestionIndex++;
    this._startTimer();
   
  }

  uncheckOtherOptions(currentOption: IOptions, currentMcq: IQuestion) {
    currentMcq.options.forEach( op => {
      if(op != currentOption) {
        op.isOptionCorrect = false;
      }
    })
  }
  

  private _startTimer() {
    const endTime = moment().add(1, 'minutes');
  
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear the previous timer interval if it exists
    }
  
    this.timerInterval = setInterval(() => {
      const currentTime = moment();
      const duration = moment.duration(endTime.diff(currentTime));
  
      const seconds = duration.seconds();
  
      if (duration.asSeconds() <= 0) {
        // One minute has completed
        clearInterval(this.timerInterval);
        this.nextQuestion(this.quizMcqs[this.currentQuestionIndex]);
      } else {
        this.timer = `${seconds} seconds`;
      }
    }, 0); // Run the interval every second (1000 milliseconds)
  }
  

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(event: Event): void {
    if (document.visibilityState !== 'hidden') {
      this.nextQuestion(this.quizMcqs[this.currentQuestionIndex]);
    }
  }
}
