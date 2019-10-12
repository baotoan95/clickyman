import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {catchError} from "rxjs/operators";
import {NotificationService} from "../services/notification.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private readonly notificationService: NotificationService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logout();
        location.reload();
      } else if (err.status === 400) {
        console.log(err);
        const snackBar = this.notificationService.pushSnackBar({
          message: "Bad request"
        });
        snackBar.then(snackBarRef => {
          snackBarRef.afterDismissed().subscribe(() => {
            this.notificationService.pushDialog({
              message: "Bad request"
            });
          });
        });
      }

      console.log(err);

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

}
