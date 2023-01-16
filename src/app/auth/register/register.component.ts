import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../shared/models/user.model";
import {AuthService} from "../auth.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {LocalUserService} from "../../shared/services/localUser.service";
import {Router} from "@angular/router";
import {plainToInstance} from "class-transformer";
import {ToastService} from "../../shared/toast/toast-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  error: string | undefined;
  userToBeEdited: UserModel | undefined;

  //Dates for the datepicker
  today = new Date();
  minDate = {year: this.today.getFullYear() - 100, month: 1, day: 1};
  maxDate = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()};

  constructor(private authService: AuthService, private localUserService: LocalUserService, private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {
    if (this.router.url === '/profile' && this.localUserService.isLoggedIn.value) {
      this.userToBeEdited = plainToInstance(UserModel, this.localUserService.localUser.user);
    }

    this.initRegisterForm();
  }

  private initRegisterForm() {
    let firstname: string | undefined;
    let lastname: string | undefined;
    let birthdate: NgbDateStruct = {day: 0, month: 0, year: 0};
    let gender: string | undefined;
    let email: string | undefined;

    if (this.userToBeEdited != null) {
      firstname = this.userToBeEdited.firstname;
      lastname = this.userToBeEdited.lastname;
      if (this.userToBeEdited.birthdate != null) {
        birthdate = ({
          year: this.userToBeEdited.birthdate.getUTCFullYear(),
          month: this.userToBeEdited.birthdate.getMonth() + 1,
          day: this.userToBeEdited.birthdate.getDate()
        } as NgbDateStruct);
      }
      gender = this.userToBeEdited.gender;
      email = this.userToBeEdited.email;
    }

    this.registerForm = new FormGroup({
      'firstname': new FormControl(firstname, Validators.required),
      'lastname': new FormControl(lastname, Validators.required),
      'birthdate': new FormControl(birthdate),
      'gender': new FormControl(gender == null ? 'pH' : gender),
      'email': new FormControl(email, [Validators.required, Validators.email, Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
    });
  }

  onRegister() {
    let newUser = new UserModel(this.registerForm.value);

    //Convert NgbDateStruct to Date
    if (this.registerForm.get('birthdate')?.value != null) {
      const birthdate = this.registerForm.get('birthdate')?.value as NgbDateStruct;
      newUser.birthdate = new Date(birthdate.year + "-" + birthdate.month + "-" + birthdate.day);
    }

    if (this.userToBeEdited == null) {
      this.authService.register(newUser).subscribe({
          next: () => {
            if (this.localUserService.isLoggedIn.value) {
              this.router.navigate(['']);
              this.registerForm.reset();
            }
          },
          error: errorMessage => {
            this.error = errorMessage;
            this.registerForm.get("password")?.reset();
          }
        }
      );
    } else {
      newUser.id = this.userToBeEdited.id;
      this.localUserService.updateUserAccount(newUser).subscribe({
        next: () => {
          this.toastService.show('Your profile is updated', {classname: 'bg-success text-light', delay: 3000});
          this.authService.updateLocalUserInfo(newUser);
        },
        error: errorMessage => {
          this.toastService.show(errorMessage, {classname: 'bg-danger text-light', delay: 3000});
        }
      })
    }
  }

  ngOnDestroy() {
    this.toastService.clear();
  }
}
