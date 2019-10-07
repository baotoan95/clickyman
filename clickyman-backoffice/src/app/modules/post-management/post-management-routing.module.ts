import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "../../core/core.module";
import {OverviewComponent} from "./pages/overview/overview.component";
import {PostManagementComponent} from "./pages/home/post-management.component";

const routes: Routes = [
  {
    path: "",
    component: PostManagementComponent,
    children: [
      {
        path: "",
        component: OverviewComponent,
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CoreModule,
  ],
  exports: [RouterModule]
})
export class PostManagementRoutingModule {
}
