import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as lodash from "lodash";
import {Observable} from "rxjs";

export const JWT_TOKEN_KEY = "jwtToken";

@Injectable()
export class HttpService {
  req: RequestHelper;
  _: any;
  commonHelper: CommonHelper;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.req = new RequestHelper(httpClient);
    this._ = lodash;
  }
}

export interface IToken {
  access_token: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

export class JwtToken implements IToken {
  public access_token: string;
  public expires_in: number;
  public refresh_token: string;
  public scope!: string;
  public token_type: string;
}

class RequestHelper {
  constructor(private httpClient: HttpClient) {
  }

  get(api: string, headers?: any): Observable<any> {
    return this.httpClient.get(api, {headers});
  }

  post(api: string, data: any, headers?: any): Observable<any> {
    return this.httpClient.post(api, data, {headers});
  }

  put(api: string, data: any, headers?: any): Observable<any> {
    return this.httpClient.put(api, data, {headers});
  }

  delete(api: string, headers?: any): Observable<any> {
    return this.httpClient.delete(api, {headers});
  }
}

class CommonHelper {

}
