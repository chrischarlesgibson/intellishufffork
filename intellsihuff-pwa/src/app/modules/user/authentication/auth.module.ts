import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ComponentsWithFormsModule } from "src/app/components/components-with-forms.module";
import { AuthService } from "./auth.service";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthService
    ],
    imports: [
        ComponentsWithFormsModule
    ]
  })
export class AuthModule{

}