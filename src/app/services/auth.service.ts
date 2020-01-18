import { AuthResultModel } from './../models/authresult.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string) {
    const requestUrl = "http://demo.oybek.com/oauth/token";
    const payload = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&grant_type=password`;

    return this.http.post<AuthResultModel>(requestUrl, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      }
    }).pipe(concatMap(answer => {
      let token = answer.access_token;
      sessionStorage.setItem("token", token);
      let getDetailsUrl = "http://demo.oybek.com/api/User/Details";

      return this.http.get<any>(getDetailsUrl).pipe(tap(() => {

      }));
    }));
  }
}
