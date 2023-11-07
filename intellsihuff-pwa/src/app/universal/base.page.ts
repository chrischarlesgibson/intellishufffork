import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';


import { AppInjector } from './app-injector';
import { HelperService } from './helper.service';
import { AppSettingService } from './app-setting.service';
import { NgxPubSubService } from './pub-sub/ngx-pub-sub.service';

@Component({
    template: 'NO UI TO BE FOUND HERE!',
})
export class BasePage {
    protected router: Router;
    protected helperSvc: HelperService;
    protected pubsubSvc: NgxPubSubService;
    protected appSettingSvc: AppSettingService;

    constructor() {
        const injector = AppInjector.getInjector();

        this.router = injector.get(Router);
        this.helperSvc = injector.get(HelperService);
        this.pubsubSvc = injector.get(NgxPubSubService);
        this.appSettingSvc = injector.get(AppSettingService);
    }

    async navigate(args: { path, params?: boolean, extras?: NavigationExtras }) {
        if(args.params) {
            await this.router.navigate([args.path, args.params], args.extras)
        } else {
            await this.router.navigate([args.path], args.extras)
        }
    }

    async navigateToHome(shouldReplaceUrl = true) {
        // await this.navigate({ path: '/home', extras: shouldReplaceUrl ? { replaceUrl: shouldReplaceUrl } : null });
    }
}
