import {ErrorHandler, NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {LoaderService} from "./services/loader.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoaderInterceptor} from "./interceptors/loader.interceptor";
import {LoaderComponent} from "./components/loader/loader.component";
import {LoadPlaceholderComponent} from "./components/load-placeholder/load-placeholder.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {HttpService} from "./services/http.service";
import {LocalStorageService} from "./services/localstorage.service";
import {GlobalErrorHandler} from "./services/error.service";
import {HttpHeaderInterceptor} from "./interceptors/http-header.interceptor";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import {ErrorDialogComponent} from "./components/dialog/error-dialog/error-dialog.component";
import {NotificationService} from "./services/notification.service";

@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    LoadPlaceholderComponent,
    ErrorDialogComponent,
  ],
  entryComponents: [
    ErrorDialogComponent
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
    NotificationService,
  ],
  exports: [
    CommonModule,
    LoaderComponent
  ]
})
export class CoreModule {
}
