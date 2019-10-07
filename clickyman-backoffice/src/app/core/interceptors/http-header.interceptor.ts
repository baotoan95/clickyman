import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = this.authService.jwtAccessToken;
    if (currentToken) {
      req = req.clone({
        setHeaders: {
          Authorization: currentToken
        }
      });
    }
    return next.handle(req);
  }
}
