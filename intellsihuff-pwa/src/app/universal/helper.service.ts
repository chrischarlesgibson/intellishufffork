import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { UserConstant } from "../modules/user/user-constant";
import { AppInjector } from "./app-injector";
import { NgxPubSubService } from "./pub-sub";

@Injectable({
    providedIn: 'root'
  })
export class HelperService {
  protected pubSub: NgxPubSubService;
   constructor(
    private datePipe: DatePipe
   ) { 
    const injector = AppInjector.getInjector();
    this.pubSub = injector.get(NgxPubSubService);
   }
   
  //  get loader() {
  //   // let _loader = this.loadingCtrl.create({
  //   //     cssClass: 'custom-loader',
  //   //     showBackdrop: true
  //   // });
  //   // return _loader;
  //   }

  formatDate(date: Date): any {
    return this.datePipe.transform(date, 'dd MMMM, yyyy');
  }

  presentConfirationmDialogue() {
    Swal.fire({
      title: 'Are you sure',
      text: "You wan to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: '#d33 !important',
      confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Logged Out!',
            'User successfully logged out.',
            'success'
          )

          this.pubSub.publishEvent(UserConstant.EVENT_USER_LOGGEDOUT, { 
            clearCache: true
          });
        }
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