import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { ListViewModel } from '../models/common.model';
import { UserModel } from '../models/user.model';
import { UserExtendedModel } from '../models/userextended.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserManagementService {
    private managementUrl: string = "http://demo.oybek.com/api/UserManagement";

    constructor(private http: HttpClient){}

    listUsers(pageNumber: number): Observable<ListViewModel<UserModel>> {
        if (typeof pageNumber !== "number" || pageNumber != pageNumber || pageNumber <= 0) {
            pageNumber = 1;
        }

        const requestUrl = `${this.managementUrl}?pageNumber=${pageNumber}`;

        return this.http.get<ListViewModel<UserModel>>(requestUrl);
    }

    createUser(model: UserExtendedModel): Observable<UserExtendedModel> {
        if (!model)
        {
            throwError("The model cannot be null");
        }

        return this.http.post<{
            Data: UserExtendedModel,
            Success: true
        }>(this.managementUrl, model).pipe(map(x => {
            return x.Data
        }));
    }

    deleteUser(userId: number): Observable<any> {
        if (!userId)
        {
            throwError("The user ID cannot be null");
        }

        const requestUrl = `${this.managementUrl}?userId=${userId}`;

        return this.http.delete<any>(requestUrl);
    }
}