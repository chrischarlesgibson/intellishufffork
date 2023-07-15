import { Component, OnInit } from '@angular/core';
import { ISubject } from 'src/app/modules/user/subject/subject.model';
import { SubjectService } from 'src/app/modules/user/subject/subject.service';
import { BasePage } from 'src/app/universal/base.page';

@Component({
  selector: 'app-subjects-listing',
  templateUrl: './subjects-listing.component.html',
  styleUrls: ['./subjects-listing.component.scss']
})
export class SubjectsListingComponent extends BasePage implements OnInit {
  subjects: ISubject[];
  editingMode = false;

  constructor(private subjectSvc: SubjectService) {
    super();
  }

  async ngOnInit() {
    this.helperSvc.presentLoader('Fetching all subjects');
    try {
      await this._getAllSubjects();
      
    } catch (error) {
      
    } finally {
      this.helperSvc.dismissLoader();
    }
  }

  onEditSubjectClicked(subject) {
    this.subjects.map(s => subject.id == s.id ? s.isEditing = true : s.isEditing = false );
  }

  cancelEditing(subject) {
    this.subjects.map(s =>  {
      if(s.id == subject.id) {
        s.isEditing = false
      }
    });
  }

  async saveChanges(subject) {
    this.helperSvc.presentLoader('Changing subject');
    try {
      const resp = await this.subjectSvc.updateSubject(subject);
      this.subjects.map(s =>  {
        if(s.id == subject.id) {
          s.isEditing = false
        }
      });
    } catch (error) {
      
    } finally {
      this.helperSvc.dismissLoader();
    }

  }

  async onDltSubjectClicked(subject) {

    const resp = await this.helperSvc.presentConfirmDialogue('Are you sure', 'You want to delete this subject?', 'warning');
    if(!resp) {
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
  }
}
