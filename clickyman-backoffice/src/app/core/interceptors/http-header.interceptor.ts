import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../../environments/environment";

export const EXCLUDE_URLs: string[] = [
  `${environment.backendUrls.authentication.baseUrl}${environment.backendUrls.authentication.login}`,
  `${environment.backendUrls.authentication.baseUrl}${environment.backendUrls.authentication.refresh}`
];

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = this.authService.accessToken;
    if (currentToken && !EXCLUDE_URLs.includes(req.url)) {
      req = this.authService.setAuthenticationHeader(req);
    }
    return next.handle(req);
  }
}
