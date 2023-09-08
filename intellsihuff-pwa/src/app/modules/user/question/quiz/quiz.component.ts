import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BasePage } from 'src/app/universal/base.page';
import { IOptions, IQuestion } from '../question.model';
import { SharedService } from '../shared.service';

import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent extends BasePage implements OnInit, OnDestroy {
  quizMcqs: IQuestion[] = [];
  userSolvedMcqs: IQuestion[] = [];

  currentQuestionIndex: any; // Index of the currently displayed MCQ
  timer: any = null;

  correctCount: number = 0;
  wrongCount: number = 0;

  private timerInterval: any; // Variable to store the timer interval
  private _subscription: Subscription;
  usedNumbers: any[] = [];

  getLetter(index: number): string {
    return String.fromCharCode(97 + index);
  }

  constructor(
    private sharedSvc: SharedService,
    private renderer: Renderer2,
  ) {
    super();
  }

  ngOnInit(): void {
    this.sharedSvc.mcqs$.subscribe((mcqs) => {
      if (mcqs) {
        this.quizMcqs = JSON.parse(JSON.stringify(mcqs));
        this.quizMcqs.forEach((m) => {
          m.options.forEach((o) => {
            o.isOptionCorrect = false;
          });
        });
      }
    });

    this.currentQuestionIndex = this._generateRandomNumber(
      this.usedNumbers,
      this.quizMcqs.length,
    );
    this.usedNumbers.push(this.currentQuestionIndex);

    this._startTimer();
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  async nextQuestion(currentMcq?, skip = false) {
    if (!this.atLeastOneOptionSelected() && !skip) {
      return;
    }

    this.userSolvedMcqs.push({ ...currentMcq });

    if (this.quizMcqs.length == this.userSolvedMcqs.length) {
      // all questions completed
      this._subscription = this.sharedSvc.mcqs$.subscribe((mcqs) => {
        if (mcqs) {
          this.quizMcqs = JSON.parse(JSON.stringify(mcqs));

          for (const userMcq of this.userSolvedMcqs) {
            const quizMcq = this.quizMcqs.find((q) => q.id === userMcq.id);

            if (quizMcq) {
              // Find the index of the selected option in the user's answer
              const selectedOptionIndex = userMcq.options.findIndex(
                (option) => option.isOptionCorrect,
              );

              // Check if the selected option matches the correct option in the quiz MCQ
              if (
                selectedOptionIndex !== -1 &&
                selectedOptionIndex ===
                  quizMcq.options.findIndex((option) => option.isOptionCorrect)
              ) {
                this.correctCount++;
              } else {
                this.wrongCount++;
              }
            }
          }

          return;
        }
      });
    }
    // this.currentQuestionIndex  = this._generateRandomNumber(this.usedNumbers, this.quizMcqs.length );
    this.usedNumbers.push(this.currentQuestionIndex);

    this._startTimer();
  }

  uncheckOtherOptions(currentOption: IOptions, currentMcq: IQuestion) {
    currentMcq.options.forEach((op) => {
      if (op != currentOption) {
        op.isOptionCorrect = false;
      }
    });
  }

  atLeastOneOptionSelected(): boolean {
    if (this.quizMcqs && this.quizMcqs[this.currentQuestionIndex]) {
      return this.quizMcqs[this.currentQuestionIndex].options.some(
        (op) => op.isOptionCorrect,
      );
    }
    return false;
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
        this.nextQuestion(this.quizMcqs[this.currentQuestionIndex], true);
      } else {
        this.timer = `${seconds} seconds`;
      }
    }, 0); // Run the interval every second (1000 milliseconds)
  }

  private _generateRandomNumber(usedNumbers: any, max: any) {
    let randomNumber = Math.floor(Math.random() * max);
    console.log('randomNumber', randomNumber);
    console.log('usedNumbers', usedNumbers);

    while (usedNumbers.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * max);
    }
    return randomNumber;
  }

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(event: Event): void {
    if (document.visibilityState === 'hidden') {
      this.nextQuestion(this.quizMcqs[this.currentQuestionIndex], true);
    }
  }
}
