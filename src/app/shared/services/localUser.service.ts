import {Injectable} from "@angular/core";
import {LocalUserModel} from "../models/localUser.model";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class LocalUserService {
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _localUser: LocalUserModel | undefined;

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
}
