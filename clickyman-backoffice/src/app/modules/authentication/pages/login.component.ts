import {Component} from "@angular/core";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss"
  ]
})
export class LoginComponent {
  constructor(private readonly authService: AuthenticationService) {}
}
