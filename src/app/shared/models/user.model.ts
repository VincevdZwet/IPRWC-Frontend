import {Type} from "class-transformer";

export class UserModel {
  id: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  @Type(() => Date)
  birthdate: Date | undefined;
  gender: string | undefined;
  email: string | undefined;
  password?: string;
  enabled?: boolean;
  role: string | undefined;

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
