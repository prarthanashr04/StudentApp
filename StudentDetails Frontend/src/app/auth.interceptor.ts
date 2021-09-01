import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const idToken = localStorage.getItem("id_token"); //retrieving token from local storage
    if (idToken) {
      const cloned = request.clone({          //if the JWT is present, then we will clone the HTTP headers, and add an extra Authorization header, which will contain the JWT
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });

      return next.handle(cloned);       //if the JWT is not present, then the request goes through to the server unmodified
    } else {
      return next.handle(request);
    }
  }
}
