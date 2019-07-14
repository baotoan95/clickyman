import { environment } from 'src/environments/environment.prod';
import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
    name: 'ClickyMan',
    version: '0.0.1',
    routes: {
        home: ''
    },
    endpoints: {
        baseUrl: environment.baseUrl
    },
    generalConfig: {
        dataFormat: 'DD/MM/YYYY'
    }
}