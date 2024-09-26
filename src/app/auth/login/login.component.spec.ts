import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe("Login Component", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButton: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        {provide: AuthService, useValue: {}},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance;
    fixture.detectChanges();

    submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  });

  it('should enable the login button when the form is valid', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
    emailInput.value = "test@mail.com"
    emailInput.dispatchEvent(new Event('input'));

    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"')).nativeElement;
    passwordInput.value = "Test123!"
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalsy();
  });

  it('should disable the login button when the form (email) is invalid', () => {
    component.loginForm.controls['email'].setValue("test@mail");
    component.loginForm.controls['password'].setValue("Test123!");

    component.loginForm.updateValueAndValidity();
    fixture.detectChanges();

    expect(submitButton.disabled).toBeTruthy();
  });

  it('should disable the login button when the form is invalid', () => {
    component.loginForm.controls['email'].setValue("test@mail.com");
    component.loginForm.controls['password'].setValue("");

    component.loginForm.updateValueAndValidity();
    fixture.detectChanges();

    expect(submitButton.disabled).toBeTruthy();
  });
})
