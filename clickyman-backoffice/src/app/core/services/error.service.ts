import {ErrorHandler, Injectable} from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error): void {
    console.log(error.message);
    throw error;
  }
}
