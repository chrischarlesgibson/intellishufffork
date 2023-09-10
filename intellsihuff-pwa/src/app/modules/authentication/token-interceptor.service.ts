import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject, from } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { UserSettingService } from "../user/user-setting.service";
import { AuthService } from "./auth.service";
import { NgxPubSubService } from "src/app/universal/pub-sub";
import { UserConstant } from "../user/user-constant";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private userSettingSvc: UserSettingService
    , private userSvc: AuthService, private pubsubSvc: NgxPubSubService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let $obs = from(this.userSettingSvc.getAccessToken());
    if(request.url.endsWith('/refreshToken')) {
        $obs = from(this.userSettingSvc.getRefreshToken());
    }
    return $obs.pipe(
        switchMap((token: any) => {
            if (token) {
              request = this.addToken(request, token);
            }

            return next.handle(request).pipe(
                catchError((e) => {
                  if(e instanceof HttpErrorResponse ) {
                    if (e.error?.name === "TokenExpiredError") {
                      return this.handle401Error(request, next);
                    } else if (e.error?.message === 'Unauthorized' || ["JsonWebTokenError", "RefreshTokenExpiredError"].includes(e.error?.name)) {
                        this.isRefreshing = true;
                        this.refreshTokenSubject.next(null);

                        this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDOUT, { clearCache: true, displayLoginDialog: true });
                        return throwError(e);
                    } else {
                      return throwError(e);
                    }
                  } else {
                    return throwError(e);
                  }
                })
            );
        })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return from(this.userSvc.getNewAccessToken()).pipe(
        switchMap((tokens: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(tokens.access_token);

            //update local db...
            const promises = [];
            // this.userSettingSvc.removeCurrentUser();
            // const user = this.userSvc.getCurrentUser(1);
            // this.userSettingSvc.putCurrentUser(user);
          
            this.userSettingSvc.removeAccessToken();
            this.userSettingSvc.removeRefreshToken();
            this.userSettingSvc.putAccessToken(tokens.access_token);
            this.userSettingSvc.putRefreshToken(tokens.refresh_token);

            return from(Promise.all(promises)).pipe(
              switchMap(() => {
                  return next.handle(this.addToken(request, tokens.access_token));
              })
            );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}


export const tokenInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
};