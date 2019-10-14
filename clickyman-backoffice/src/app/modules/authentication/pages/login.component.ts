import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss"
  ]
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
  ) {
    // TODO: Redirect while user logged in
  }

  public ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  public createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  private async onSubmit(event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.login(username, password).pipe(first()).subscribe(async userInfo => {
        console.log(userInfo);
        await this.router.navigate([this.activateRoute.snapshot.queryParams.returnUrl || "/"]);
      }, err => {
        console.log(err);
      });
    }
  }
}
