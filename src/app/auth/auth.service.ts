import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {LocalUserModel} from "../shared/models/localUser.model";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "../shared/services/error-handling.service";
import {LocalUserService} from "../shared/services/localUser.service";
import {UserModel} from "../shared/models/user.model";
import {Router} from "@angular/router";

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
  user = new BehaviorSubject<LocalUserModel | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlingService: ErrorHandlingService,
    private localUserService: LocalUserService) {
  }

  register(user: UserModel) {
    // this.http.post('/auth/register', {
    //     firstname: user.firstname,
    //     lastname: user.lastname,
    //     birthdate: user.birthdate,
    //     gender: user.gender,
    //     email: user.email,
    //     password: user.password
    //   }
    // ).pipe(catchError(this.errorHandlingService.handleError)).subscribe({
    //   next: () => {
    //     console.log("done");
    //     console.log(user);
    //   }
    // });

    this.http.post('/auth/register',
      user
    ).pipe(catchError(this.errorHandlingService.handleError)).subscribe({
      next: () => {
        console.log("done");
        console.log(user);
      }
    });
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

    this.localUserService.setLoggedIn = true;
    this.localUserService.localUser = userData;

    // const loadedUser = new LocalUserModel(userData._token);
    // if (loadedUser.token) {
    //   this.user.next(loadedUser);
    // }
  }


  logout() {
    // this.user.next(null);
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    this.localUserService.localUser = undefined;
    this.localUserService.setLoggedIn = false;
    this.router.navigate(['/login']);
  }

  private handleAuthentication(response: IAuthResponseData, rememberMe: boolean) {
    if (!response.token) {
      return;
    }

    const localUser = new LocalUserModel(response.token, response.user)

    //Maybe delete this
    // const user = new LocalUserModel(response.token);
    // this.user.next(user);

    if (rememberMe) {
      localStorage.setItem('userData', JSON.stringify(localUser));
    } else {
      sessionStorage.setItem('userData', JSON.stringify(localUser));
    }

    this.localUserService.setLoggedIn = true;
    this.localUserService.localUser = localUser;
  }
}
