import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { ListViewModel } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})

export class UserManagementService {
    constructor(private http: HttpClient){}

    listUsers(pageNumber: number): Observable<ListViewModel<UserModel>> {
        if (typeof pageNumber !== "number" || pageNumber != pageNumber || pageNumber <= 0) {
            pageNumber = 1;
        }

        const requestUrl = `http://demo.oybek.com/api/UserManagement?pageNumber=${pageNumber}`;

        return this.http.get<ListViewModel<UserModel>>(requestUrl);
    }
}