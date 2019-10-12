import {Component} from "@angular/core";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss"
  ]
})
export class LoginComponent {
  private loginForm: FormGroup;

  constructor(private readonly authService: AuthenticationService) {
    this.loginForm = this.createFormGroup();
  }

  public createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  private async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      await this.authService.login(username, password);
    }
  }
}
