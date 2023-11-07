import { Injectable } from "@angular/core"
import { UserConstant } from "../user/user-constant";
import { IUser } from "./auth.model";

declare const FB: any;

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGoogleService {
    user: IUser;
    loggedIn: boolean;
    constructor(

    ) {
    }

}