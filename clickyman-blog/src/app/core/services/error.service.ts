import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor() {}

    handleError(error) {
        alert("You're stupid man!!!");
        // TODO: log error to the server (might be use stacktrace-js)
        throw error;
    }
}