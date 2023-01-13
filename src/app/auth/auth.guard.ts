import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, take} from "rxjs";
import {LocalUserService} from "../shared/services/localUser.service";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localUserService: LocalUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.localUserService.isLoggedIn.pipe(
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          const localUserRole: string | undefined = this.localUserService.localUser.user?.role;

          if ((route.data["roles"] && route.data["roles"].indexOf(localUserRole) === -1)
            || (route.firstChild?.data["roles"] && route.firstChild?.data["roles"].indexOf(localUserRole) === -1)) {
            return this.router.createUrlTree(['/']);
          }

          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    )
  }
}
