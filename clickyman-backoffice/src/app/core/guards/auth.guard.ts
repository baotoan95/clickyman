import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken = this.authService.jwtAccessToken;
    if (accessToken) {
      return true;
    }
    this.router.navigate(["/auth"], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
