import { UserExtendedModel } from './../models/userextended.model';
import { UserModel} from 'src/app/models/user.model';
import { AuthResultModel } from './../models/authresult.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(sessionStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  authenticate(email: string, password: string) {
    const requestUrl = `${environment.authUrl}/token`;
    const payload = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&grant_type=password`;

    return this.http.post<AuthResultModel>(requestUrl, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      }
    }).pipe(concatMap(answer => {
      let token = answer.access_token;
      sessionStorage.setItem("token", token);
      let getDetailsUrl = `${environment.apiUrl}/User/Details`;

      return this.http.get<any>(getDetailsUrl).pipe(tap(user => {
        this.currentUserSubject.next(user);
        return user;
      }));
    }));
  }

  register(user: any) {
    const registerUrl = `${environment.apiUrl}/User/Register`;

    // if (!user){
    //   throwError("The model cannot be null");
    // }

    return this.http.post<any>(registerUrl, user);
  }

  logout() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }
}
