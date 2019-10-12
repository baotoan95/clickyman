import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService, IToken, JWT_TOKEN_KEY, JwtToken} from "./http.service";
import {map} from "rxjs/operators";
import {Location} from "@angular/common";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<IToken>;
  public jwtToken: Observable<JwtToken>;

  constructor(
    private httpService: HttpService,
    private locationService: Location,
  ) {
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

  public async login(username: string, password: string): Promise<void> {
    const credential = new URLSearchParams();
    credential.append("username", username);
    credential.append("password", password);
    credential.append("grant_type", "password");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa("clientID123:password")}`
    };
    const tokenInfo = await this.httpService.req.post("http://localhost:9000/oauth/token", credential.toString(), headers).toPromise();
    if (tokenInfo) {
      localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(tokenInfo));
      this.currentTokenSubject.next(tokenInfo);
      this.locationService.back();
    } else {
      console.log("Can not get response from request authentication");
    }
  }

  public isLoggedIn(): boolean {
    return !!this.jwtAccessToken;
  }

  public logout(): void {
    localStorage.removeItem(JWT_TOKEN_KEY);
    this.currentTokenSubject.next(undefined);
  }
}

