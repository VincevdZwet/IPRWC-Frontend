import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        const urlReq = req.clone({
          url: 'http://localhost:8080' + req.url
        });

        if (!user) {
          return next.handle(urlReq);
        }
        const modifiedReq = urlReq.clone({
          headers: new HttpHeaders()
            .set('content-type', 'application/json')
            .set(
              'Authorization',
              'Bearer ' + user.token
            )
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
