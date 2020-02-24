import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserManagementService } from '../services/usermanagement.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<any> {

  usersData : any = {}
  initialPage = 1;

  constructor(
    private userManagementService: UserManagementService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    this.userManagementService.listUsers(this.initialPage).subscribe(
      firstPage => {
        this.usersData.Users = firstPage.Data;
        this.usersData.PageInfo = firstPage.PageInfo;

        this.userManagementService.listUsers(firstPage.PageInfo.TotalPages).subscribe(
          lastPage => {
            this.usersData.UsersOnLastPage = lastPage.Data.length;
          },
          error => {
            this.alertService.error(error);
            this.alertService.timeoutClear();
          } 
        )
      },
      error => {
        this.alertService.error(error);
        this.alertService.timeoutClear();
      }
    )

    return this.usersData;
  }
}
