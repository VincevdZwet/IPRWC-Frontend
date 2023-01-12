import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatepickerComponent} from "../../shared/utilities/datepicker.component";
import {UserModel} from "../../shared/models/user.model";
import {AuthService} from "../auth.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatepickerComponent]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  error: string | undefined;

  //Dates for the datepicker
  today = new Date();
  minDate = {year: this.today.getFullYear() - 100, month: 1, day: 1};
  maxDate = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()};

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.initRegisterForm();
  }

  private initRegisterForm() {
    this.registerForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'birthdate': new FormControl(null),
      'gender': new FormControl('pH'),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onRegister() {
    let newUser = new UserModel(this.registerForm.value);

    //Convert NgbDateStruct to Date
    const birthdate = (this.registerForm.get('birthdate')?.value as NgbDateStruct)
    newUser.birthdate = new Date(birthdate.year + "-" + birthdate.month + "-" + birthdate.day);
    console.log(newUser);
    this.authService.register(newUser);
  }


//   Dit plaatsen in register.component.html
//   <ngbd-datepicker formControlName="birthdate"></ngbd-datepicker>
}
