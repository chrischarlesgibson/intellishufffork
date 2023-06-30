import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppConstant } from './app-constant';
import { AppInjector } from './app-injector';
import { DbService } from './db/db-base.service';
import { SchemaService } from './db/schema.service';
import { AppSettingService } from './app-setting.service';
import { UserSettingService } from '../modules/user/user-setting.service';
import { HelperService } from './helper.service';
import { NgxPubSubService } from './pub-sub';
import { DbWebService } from './db/db-web.service';

export class BaseService {
    protected http: HttpClient;
    protected dbService: DbService;
    protected schemaSvc: SchemaService;
    protected appSettingSvc: AppSettingService;
    protected userSettingSvc: UserSettingService;
    protected helperSvc: HelperService;
    protected pubsubSvc: NgxPubSubService;    /**
     *
     */
    constructor() {
        const injector = AppInjector.getInjector();
        this.http = injector.get(HttpClient);
        this.schemaSvc = injector.get(SchemaService);
        this.appSettingSvc = injector.get(AppSettingService);
        this.userSettingSvc = injector.get(UserSettingService);
        this.helperSvc = injector.get(HelperService);
        this.pubsubSvc = injector.get(NgxPubSubService);

        setTimeout(async () => {
            this.dbService = injector.get(DbWebService);
        }, 0);
    }

    protected getData<T>(args: HttpParams): Promise<T> {
        return new Promise(async (resolve, reject) => {
            let headers: HttpHeaders = await this.prepareHeaders(args);

            args.body = args.body || {};  
            if(!args.overrideUrl) {
                let newUrl = `${AppConstant.BASE_API_URL + args.url}`;

                for(let prop in args.body) {
                    if(args.body.hasOwnProperty(prop)) {
                        if(newUrl.includes('?')) {
                            newUrl += '&';
                        } else {
                            newUrl += '?';
                        }
                        newUrl += `${prop}=${typeof args.body[prop] === 'undefined' ? '' :  args.body[prop]}`;
                    }
                }   
                args.url = newUrl;
            }
            
            this.http.get<T>(args.url, {
                headers: headers
            })
            .subscribe(result => {
                resolve(<T>result);
            }, error => {
                this.handleError(error, args);
                if(args.errorCallback) {
                    resolve(null as unknown as T);
                } else {
                    reject(error);
                }
            });
        });
    }

    protected postData<T>(args: HttpParams): Promise<T> {
        return new Promise(async (resolve, reject) => {
            let headers: HttpHeaders = await this.prepareHeaders(args);

            let newUrl;
            if(!args.overrideUrl) {
                newUrl = `${AppConstant.BASE_API_URL + args.url}`;
            } else {
                newUrl = args.url;
            }
  
            args.url = newUrl;

            //add to queue
            let body = args.body;
            this.http.post<T>(args.url, body, {
                headers: headers
            })
            .subscribe(result => {
                resolve(<T>result);
            }, error => {
                this.handleError(error, args);
                if(args.errorCallback) {
                    resolve(null as unknown as T);
                } else {
                    reject(error);
                }
            });
        });
    }

    protected async handleError(e: HttpErrorResponse, args: HttpParams) {
        if(AppConstant.DEBUG) {
            console.log('BaseService: handleError', e);
        }
        switch(e.status) {
            // case 401:
            //     const u = await this.userSettingSvc.getCurrentUser();
            //     if(u) {
            //         //TODO: check for token expiration...
            //         //kickout...
            //         this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDOUT, { clearCache: true, displayLoginDialog: true });
            //     }
            // break;
            default:
                if(!args.errorCallback) {
                    let msg;
                    //the error might be thrown by e.g a plugin wasn't install properly. In that case text() will not be available
                    if(e.message) {
                        msg = e.message;            
                    } else {
                        msg = e.error.toString();
                    }
                    // setTimeout(async () => {
                    //     await this.helperSvc.alert(msg);
                    // });
                } else {
                    args.errorCallback(e, args);
                }
            break;
        }
    }
    
    private async prepareHeaders(args: HttpParams) {
        let headers = new HttpHeaders();
        if(!args.ignoreContentType) {
            headers = headers.append('Content-Type', 'application/json;charset=utf-8');            
        }
        
        // const token = await this.userSettingSvc.getAccessToken();
        // if(token) {
        //     headers = headers.append('Authorization', `Bearer ${token}`);            
        // }

        if(args.httpHeaders) {
            args.httpHeaders.keys().forEach(k => {
            // @ts-ignore
            headers = headers.append(k, args.httpHeaders.get(k));
            });
        }
        return headers;
    }
}

export class HttpParams {
    url: string
    body?: any
    errorCallback?: any;
    ignoreContentType?: boolean
    overrideUrl?: boolean
    httpHeaders?: HttpHeaders
}
