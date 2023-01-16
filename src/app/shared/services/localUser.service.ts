import {Injectable} from "@angular/core";
import {LocalUserModel} from "../models/localUser.model";
import {BehaviorSubject, catchError} from "rxjs";
import {IAuthResponseData} from "../../auth/auth.service";
import {ErrorHandlingService} from "./error-handling.service";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";

@Injectable({providedIn: "root"})
export class LocalUserService {
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _localUser: LocalUserModel | undefined;

  constructor(private errorHandlingService: ErrorHandlingService, private http: HttpClient) {
  }

  get localUser(): LocalUserModel {
    return <LocalUserModel>this._localUser;
  }

  set localUser(value: LocalUserModel | undefined) {
    this._localUser = value;
  }

  get isLoggedIn(): BehaviorSubject<boolean> {
    return this._loggedIn;
  }

  set setLoggedIn(value: boolean) {
    this._loggedIn.next(value);
  }

  updateUserAccount(user: UserModel) {
    return this.http.post<IAuthResponseData>('/user/' + user.id,
      user
    ).pipe(catchError(this.errorHandlingService.handleError));
  }
}
