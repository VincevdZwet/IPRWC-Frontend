import {Injectable} from "@angular/core";
import {LocalUserModel} from "../models/localUser.model";

@Injectable({providedIn: "root"})
export class LocalUserService {
  private _loggedIn: boolean = false;
  private _localUser: LocalUserModel | undefined;

  get localUser(): LocalUserModel {
    return <LocalUserModel>this._localUser;
  }

  set localUser(value: LocalUserModel | undefined) {
    this._localUser = value;
  }

  get isLoggedIn(): boolean {
    return this._loggedIn;
  }

  set setLoggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
