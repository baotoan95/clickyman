import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService, IToken, JWT_TOKEN_KEY, JwtToken} from "./http.service";
import {map} from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<IToken>;
  public jwtToken: Observable<JwtToken>;

  constructor(private httpService: HttpService) {
    this.currentTokenSubject = new BehaviorSubject<IToken>(JSON.parse(localStorage.getItem(JWT_TOKEN_KEY)));
    this.jwtToken = this.currentTokenSubject.asObservable();
  }

  public get jwtAccessToken(): string {
    return this.currentTokenSubject.value && this.currentTokenSubject.value.access_token;
  }

  public get jwtRefreshToken(): string {
    return this.currentTokenSubject.value && this.currentTokenSubject.value.refresh_token;
  }

  public get tokenType(): string {
    return this.currentTokenSubject.value && this.currentTokenSubject.value.token_type;
  }

  public login(username: string, password: string) {
    console.log(username, password);
    const credential = new URLSearchParams();
    credential.append("username", username);
    credential.append("password", password);
    credential.append("grant_type", "password");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa("clientID123:password")}`
    };
    this.httpService.req.post("http://localhost:9000/oauth/token", credential.toString(), headers).pipe(map(token => {
      if (token) {
        localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(token));
        this.currentTokenSubject.next(token);
      }
      return token;
    }));
  }

  public logout(): void {
    localStorage.removeItem(JWT_TOKEN_KEY);
    this.currentTokenSubject.next(undefined);
  }
}

