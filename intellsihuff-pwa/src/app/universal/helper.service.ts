import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { UserConstant } from "../modules/user/user-constant";
import { AppInjector } from "./app-injector";
import { NgxPubSubService } from "./pub-sub";

import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
  })
export class HelperService {
  protected pubSub: NgxPubSubService;
  private _loaderInstance: any;

   constructor(
    private datePipe: DatePipe
   ) { 
    const injector = AppInjector.getInjector();
    this.pubSub = injector.get(NgxPubSubService);
   }
   
   presentLoader(text) {
    this._loaderInstance = <any>Swal.fire({
      title: text,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  dismissLoader() {
    if (this._loaderInstance) {
      this._loaderInstance.close();
      this._loaderInstance = null;
    }
  }

  formatDate(date: Date): any {
    return this.datePipe.transform(date, 'dd MMMM, yyyy');
  }

  

  // presentConfirationDialogue() {
  //   Swal.fire({
  //     title: 'Are you sure',
  //     text: "You wan to logout?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: 'var(--color-primary)',
  //     cancelButtonColor: '#d33 !important',
  //     confirmButtonText: 'Yes'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         Swal.fire(
  //           'Logged Out!',
  //           'User successfully logged out.',
  //           'success'
  //         )

  //         this.pubSub.publishEvent(UserConstant.EVENT_USER_LOGGEDOUT, { 
  //           clearCache: true
  //         });
  //       }
  //   })
  // }

  presentConfirmDialogue(title, text, icon) {
    return new Promise( (resolve ) => {
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(result.isConfirmed)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resolve(result.isConfirmed)
        }
      });
    })

  }

  presentAlert(text: string, icon?: any, timer = 1500) {
    Swal.fire({
      position: 'center',
      icon: icon ,
      title: text,
      showConfirmButton: false,
      timer: timer
    })
  }
}
