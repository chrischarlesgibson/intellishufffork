import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsWithFormsModule } from "src/app/components/components-with-forms.module";
import { SubjectService } from "./subject.service";


@NgModule({
    declarations: [
    ],
    imports: [
     ComponentsWithFormsModule
    ],
    providers: [SubjectService],
    exports: [RouterModule]
  })
export class SubjectModule {
    /**
     *
     */
    constructor() {
        
    }
}