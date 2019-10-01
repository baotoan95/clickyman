import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './modules/home/home.module';
import {CoreModule} from './core/core.module';
import {environment} from '../environments/environment';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebase, 'clickyman-pet'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('vi');
  }
}
