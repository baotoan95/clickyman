import {NgModule} from "@angular/core";
import {LoginComponent} from "./pages/login.component";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";
import {AuthenticationRoutingModule} from "./authentication-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule {

}
