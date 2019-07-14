import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LoaderService } from './services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadPlaceholderComponent } from './components/load-placeholder/load-placeholder.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { LocalStorageService } from './services/localstorage.service';

@NgModule({
    declarations: [
        HeaderComponent,
        LoaderComponent,
        LoadPlaceholderComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
        LoaderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        HttpService,
        LocalStorageService
    ],
    exports: [
        LoaderComponent
    ]
})
export class CoreModule {}