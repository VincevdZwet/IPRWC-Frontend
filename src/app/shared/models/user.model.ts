export class UserModel {
  id: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  birthdate: Date | undefined;
  gender: string | undefined;
  email: string | undefined;
  password?: string;
  enabled?: boolean;
  role: string | undefined;

  // constructor(id?: string, firstname?: string, lastname?: string,
  // birthdate?: Date, gender?: string, email?: string, role?: string, enabled?: boolean){
  //   this.id = id;
  //   this.firstname = firstname;
  //   this.lastname = lastname;
  //   this.birthdate = birthdate;
  //   this.gender = gender;
  //   this.email = email;
  //   this.enabled = enabled;
  //   this.role = role;
  // }

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
