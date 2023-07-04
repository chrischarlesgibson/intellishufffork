import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private mcqsSubject = new BehaviorSubject<any>(null);
  mcqs$ = this.mcqsSubject.asObservable();

  setMcqs(mcqs: any) {
    this.mcqsSubject.next(mcqs);
  }
}
 