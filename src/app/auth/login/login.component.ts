import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {LocalUserService} from "../../shared/services/localUser.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | undefined;

  constructor(private authService: AuthService, private localUserService: LocalUserService, private router: Router) {
  }

  ngOnInit() {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)]),
      'password': new FormControl(null, Validators.required),
      'rememberMe': new FormControl(false)
    });
  }

  onLogin() {
    const email: string = this.loginForm.value['email'];
    const password: string = this.loginForm.value['password'];
    const rememberMe: boolean = this.loginForm.value['rememberMe'];

    this.authService.login(email, password, rememberMe).subscribe({
      next: () => {
        if (this.localUserService.isLoggedIn.value) {
          this.router.navigate(['']);
          this.loginForm.reset();
        }
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.loginForm.get("password")?.reset();
      }
    });
  }
}
