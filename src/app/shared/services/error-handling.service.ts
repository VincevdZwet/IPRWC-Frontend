import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {ErrorModel} from "../models/error.model";

@Injectable({providedIn: "root"})
export class ErrorHandlingService{
  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => errorMessage);
    }

    for (const [key, value] of ErrorModel.errorMap) {
      if (errorRes.error.message === key) {
        errorMessage = value;
        break;
      }
    }
    return throwError(() => errorMessage);
  }
}
