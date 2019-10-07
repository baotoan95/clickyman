import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {OverviewComponent} from "./pages/overview/overview.component";
import {PostManagementRoutingModule} from "./post-management-routing.module";
import {PostManagementComponent} from "./pages/home/post-management.component";

@NgModule({
  declarations: [
    PostManagementComponent,
    OverviewComponent,
  ],
  imports: [
    PostManagementRoutingModule,
    SharedModule,
    CoreModule,
  ],
})
export class PostManagementModule {

}
