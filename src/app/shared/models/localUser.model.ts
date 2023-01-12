import {UserModel} from "./user.model";

export class LocalUserModel {
  user?: UserModel;
  token: string;

  constructor(token: string, user?: UserModel) {
    this.token = token;
    this.user = user;
  }
}
