import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./core/guards/auth.guard";


const routes: Routes = [
  {
    path: "auth",
    loadChildren: "./modules/authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "home",
    loadChildren: "./modules/home/home.module#HomeModule",
    canActivate: [AuthGuard]
  },
  {
    path: "post-management",
    loadChildren: "./modules/post-management/post-management.module#PostManagementModule",
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "/home",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled", useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
