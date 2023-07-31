import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('closeModal') closeModal: ElementRef;

  editMode = false;
  subjects: ISubject[];
  editingMode = false;
  addSubjectFg: FormGroup;

  constructor(
    private subjectSvc: SubjectService,
    private formBuilder: FormBuilder
  ) {
    super();

    this.addSubjectFg = this.formBuilder.group({
      name: [null, Validators.required],
      id: [null],

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
    this.addSubjectFg.patchValue({ name: subject.name, id: subject.id });
  }

  async onUpdateSubjectClicked(data) {

    try {
      const resp = await this.subjectSvc.updateSubject(data);
      this._closeModal();
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

  async onAddSubjectClicked(data: any) {
    this.helperSvc.presentLoader('Adding subject');

    try {
      const resp = await this.subjectSvc.addSubject(data);

      if (resp.status) {
        this._closeModal();
        this.helperSvc.presentAlert(resp.message, 'success');
        await this._getAllSubjects();
      } else {
        this.helperSvc.presentAlert(resp.message, 'warning');
      }
    } catch (error) {
    } finally {
      this.helperSvc.dismissLoader();
    }
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

  private _closeModal(ev?) {
    this.editMode = false;
    this.addSubjectFg.reset();
    this.closeModal.nativeElement.click();
  }

  private async _getAllSubjects() {
    this.subjects = await this.subjectSvc.getAllSubjects();
    console.log(this.subjects);
  }
}
