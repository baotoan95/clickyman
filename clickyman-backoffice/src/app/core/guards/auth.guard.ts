import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const accessToken = this.authService.accessToken;
    if (accessToken) {
      return true;
    }
    console.log("Redirect to login page");
    await this.router.navigate(["/auth"]);
    return false;
  }

}
