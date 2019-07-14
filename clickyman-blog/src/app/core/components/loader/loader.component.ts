import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'clickyman-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.styl']
})
export class LoaderComponent {
    isLoading: Subject<boolean>;

    constructor(private loaderService: LoaderService) {
        this.isLoading = this.loaderService.isLoading;
    }
}