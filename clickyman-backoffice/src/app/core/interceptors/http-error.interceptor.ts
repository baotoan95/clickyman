import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {catchError, filter, switchMap, take, tap} from "rxjs/operators";
import {NotificationService} from "../services/notification.service";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {IToken} from "../services/http.service";

const EXCLUDE_URL_400: string[] = [
  `${environment.backendUrls.authentication.baseUrl}${environment.backendUrls.authentication.login}`
];

const EXCLUDE_HANDLE_URL_401: string[] = [
  `${environment.backendUrls.authentication.baseUrl}${environment.backendUrls.authentication.refresh}`
];

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<IToken>;
  private tokenRefreshed: Observable<IToken>;
  private isRefreshing = false;

  constructor(
    private injector: Injector,
    private authService: AuthenticationService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {
    this.refreshTokenSubject = new BehaviorSubject<IToken>(null);
    this.tokenRefreshed = this.refreshTokenSubject.asObservable();
  }

  // private refreshToken() {
  //   if (this.isRefreshing) {
  //     return new Observable(observer => {
  //       this.tokenRefreshed.subscribe(() => {
  //         observer.next();
  //         observer.complete();
  //       });
  //     });
  //   } else {
  //     this.isRefreshing = true;
  //     return this.authService.refreshAccessToken().pipe(tap((rs) => {
  //       this.isRefreshing = false;
  //       this.refreshTokenSubject.next(rs);
  //     }));
  //   }
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        // req = this.authService.setAuthenticationHeader(req);
        if (err.status === 401) {
          if (EXCLUDE_HANDLE_URL_401.includes(err.url)) {
            this.authService.logout();
            this.router.navigate(["/auth"]).then();
            return next.handle(null);
          }
          // return this.refreshToken().pipe(
          //   switchMap(() => {
          //     req = this.authService.setAuthenticationHeader(req);
          //     return next.handle(req);
          //   }),
          //   catchError(errors => {
          //     this.authService.logout();
          //     return throwError(errors);
          //   })
          // );
          return this.handle401Error(req, next);
        } else if (err.status === 400 && !this.isExclude(err.url, EXCLUDE_URL_400)) {
          this.notificationService.pushSnackBar({
            message: "Bad request"
          }).then();
        } else if (err.status === 500) {
          this.notificationService.pushSnackBar({
            message: "Unexpected error occurred"
          }).then();
        }

        console.log(err);

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshAccessToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          request = this.authService.setAuthenticationHeader(request);
          return next.handle(request);
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          request = this.authService.setAuthenticationHeader(request);
          return next.handle(request);
        }));
    }
  }

  private isExclude(url: string, excludeMatches: string[]): boolean {
    return excludeMatches.includes(url);
  }
}
