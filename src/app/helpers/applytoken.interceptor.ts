import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class ApplyTokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: any = sessionStorage.getItem('token');

        if (!req.url.includes('api/')) {
            return next.handle(req);
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization',  `Bearer ${token}`)
        });

        return next.handle(authReq);
    }
}