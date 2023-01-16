import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs";
import {LocalUserModel} from "../shared/models/localUser.model";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "../shared/services/error-handling.service";
import {LocalUserService} from "../shared/services/localUser.service";
import {UserModel} from "../shared/models/user.model";
import {Router} from "@angular/router";
import {CartService} from "../cart/cart.service";

export interface IAuthResponseData {
  token: string;
  user: {
    email: string,
    id: string,
    firstname: string
    lastname: string
    birthdate: Date
    gender: string
    role: string
  }
}

@Injectable({providedIn: "root"})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlingService: ErrorHandlingService,
    private localUserService: LocalUserService,
    private cartService: CartService) {
  }

  register(user: UserModel) {
    return this.http.post<IAuthResponseData>('/auth/register',
      user
    ).pipe(catchError(this.errorHandlingService.handleError), tap(response => {
        this.handleAuthentication(response, false)
      })
    );
  }

  login(email: string, password: string, rememberMe: boolean) {
    return this.http.post<IAuthResponseData>("/auth/login",
      {
        email: email,
        password: password
      })
      .pipe(
        catchError(this.errorHandlingService.handleError),
        tap(response => {
          this.handleAuthentication(response, rememberMe);
        })
      );
  }

  autoLogin() {
    let userData;

    if (localStorage.getItem('userData') !== null) {
      userData = JSON.parse(localStorage.getItem('userData') || '{}');
    } else if (sessionStorage.getItem('userData') !== null) {
      userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    } else {
      return;
    }

    if (userData.user === undefined || userData.token === undefined) {
      this.logout();
      return;
    }

    this.localUserService.localUser = userData;
    this.localUserService.setLoggedIn = true;
  }


  logout() {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    this.cartService.cart = [];
    this.cartService.cart$.next([]);
    this.localUserService.localUser = undefined;
    this.localUserService.setLoggedIn = false;
    this.router.navigate(['/movies']);
  }

  private handleAuthentication(response: IAuthResponseData, rememberMe: boolean) {
    if (!response.token) {
      return;
    }

    const localUser = new LocalUserModel(response.token, response.user)

    if (rememberMe) {
      localStorage.setItem('userData', JSON.stringify(localUser));
    } else {
      sessionStorage.setItem('userData', JSON.stringify(localUser));
    }

    this.localUserService.localUser = localUser;
    this.localUserService.setLoggedIn = true;
  }
}
