import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {HomeComponent} from './pages/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      CoreModule,
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
