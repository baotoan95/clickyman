import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './pages/home.component';
import {CoreModule} from '../../core/core.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    CoreModule,
  ],
})
export class HomeModule {
}
