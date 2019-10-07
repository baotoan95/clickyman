import {ErrorHandler, NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {LoaderService} from './services/loader.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import {LoaderComponent} from './components/loader/loader.component';
import {LoadPlaceholderComponent} from './components/load-placeholder/load-placeholder.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {HttpService} from './services/http.service';
import {LocalStorageService} from './services/localstorage.service';
import {GlobalErrorHandler} from './services/error.service';
import {AuthenticationService} from "./services/authentication.service";
import {HttpHeaderInterceptor} from "./interceptors/http-header.interceptor";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";

@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    LoadPlaceholderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    HttpService,
    LocalStorageService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    AuthenticationService,
  ],
  exports: [
    CommonModule,
    LoaderComponent
  ]
})
export class CoreModule {
}
