import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from 'src/app/modules/user/question/question.service';
import { ISubject } from 'src/app/modules/user/subject/subject.model';
import { SubjectService } from 'src/app/modules/user/subject/subject.service';
import { BasePage } from 'src/app/universal/base.page';

@Component({
  selector: 'app-subjects-listing',
  templateUrl: './subjects-listing.component.html',
  styleUrls: ['./subjects-listing.component.scss'],
})
export class SubjectsListingComponent
  extends BasePage
  implements OnInit, OnDestroy
{
  // @ViewChild('myModalRef') myModalRef: NgbModal;

  editMode = false;
  subjects: ISubject[];
  editingMode = false;
  addSubjectFg: FormGroup;

  constructor(
    private subjectSvc: SubjectService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    super();

    this.addSubjectFg = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  async ngOnInit() {
    try {
      await this._getAllSubjects();
    } catch (error) {}
  }

  ngOnDestroy(): void {
    const btn = document.getElementById('#dismisBtn');
    console.log(btn);
  }

  onEditSubjectClicked(subject) {
    this.editMode = true;
    this.addSubjectFg.patchValue({ name: subject.name });
  }

  async onUpdateSubjectClicked(data) {
    const sub = <ISubject>this.subjects.find((s) => {
      return (s.name = data.name);
    });

    try {
      const resp = await this.subjectSvc.updateSubject(sub);
      await this._getAllSubjects();
      this.addSubjectFg.reset();
      this.editMode = false;

      if (resp.status) {
        this.helperSvc.presentAlert(resp.message, 'success');
      } else {
        this.helperSvc.presentAlert(resp.message, 'warning');
      }
    } catch (error) {
    } finally {
      this.helperSvc.dismissLoader();
    }
  }

  async onAddSubjectClicked(data: any) {
    this.helperSvc.presentLoader('Adding subject');

    try {
      const resp = await this.subjectSvc.addSubject(data);
      await this._getAllSubjects();
      if (resp.status) {
        this.helperSvc.presentAlert(resp.message, 'success');
      } else {
        this.helperSvc.presentAlert(resp.message, 'warning');
      }
    } catch (error) {
    } finally {
      this.helperSvc.dismissLoader();
    }
  }

  clodeModal(ev) {
    this.editMode = false;
    this.addSubjectFg.reset();
  }

  async onDltSubjectClicked(subject) {
    const resp = await this.helperSvc.presentConfirmDialogue(
      'Are you sure',
      'You want to delete this subject?',
      'warning'
    );
    if (!resp) {
      return;
    }

    this.helperSvc.presentLoader('Deleting subject');

    try {
      await this.subjectSvc.deleteSubject(subject);
      await this._getAllSubjects();
    } catch (error) {
    } finally {
      this.helperSvc.dismissLoader();
    }
  }

  private async _getAllSubjects() {
    this.subjects = await this.subjectSvc.getAllSubjects();
    console.log(this.subjects);
  }
}
