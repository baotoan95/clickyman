import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService, IToken, JWT_TOKEN_KEY, JwtToken} from "./http.service";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpRequest} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<IToken>;
  public jwtToken: Observable<JwtToken>;

  constructor(
    private httpService: HttpService
  ) {
    this.currentTokenSubject = new BehaviorSubject<IToken>(JSON.parse(localStorage.getItem(JWT_TOKEN_KEY)));
    this.jwtToken = this.currentTokenSubject.asObservable();
  }

  public get accessToken(): string {
    return this.currentTokenSubject.value && this.currentTokenSubject.value.access_token;
  }

  public get refreshToken(): string {
    return this.currentTokenSubject.value && this.currentTokenSubject.value.refresh_token;
  }

  public get tokenType(): string {
    return this.currentTokenSubject.value && this.currentTokenSubject.value.token_type;
  }

  public login(username: string, password: string): Observable<IToken> {
    const credential = new URLSearchParams();
    credential.append("username", username);
    credential.append("password", password);
    credential.append("grant_type", "password");
    return this.hitAuthenticationServer(credential);
  }

  public refreshAccessToken(): Observable<IToken> {
    const data = new URLSearchParams();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", this.refreshToken);
    return this.hitAuthenticationServer(data);
  }

  private hitAuthenticationServer(params: URLSearchParams): Observable<IToken> {
    return this.httpService.req.post(
      `${environment.backendUrls.authentication.baseUrl}${environment.backendUrls.authentication.refresh}`,
      params.toString(), this.basicAuthenticationHeader())
      .pipe<IToken>(tap(tokenInfo => {
        localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(tokenInfo));
        this.currentTokenSubject.next(tokenInfo);
        return tokenInfo;
      }));
  }

  private basicAuthenticationHeader(): {"Content-Type": string, Authorization: string} {
    return {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa("clientID123:password")}`
    };
  }

  public setAuthenticationHeader(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `${this.tokenType} ${this.accessToken}`
      }
    });
  }

  public isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  public logout(): void {
    localStorage.removeItem(JWT_TOKEN_KEY);
    this.currentTokenSubject.next(undefined);
  }
}

