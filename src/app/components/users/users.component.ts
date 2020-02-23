import { AlertService } from './../../services/alert.service';
import { UserManagementService } from './../../services/usermanagement.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo } from 'src/app/models/common.model';
import { PaginationService } from 'src/app/services/pagination.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'userscomponent',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: UserModel[] = [];
  public pageInfo: PageInfo;
  public initialPage = 1;
  public usersPerPage = 8;
  public apiUsersPerPage = 30;
  public lastApiPage = 1;
  pager: any = {};

  constructor(
    private userManagementService: UserManagementService,
    private paginationService: PaginationService,
    private alertService: AlertService,
    private router: Router
  ) { this.pageInfo = new PageInfo() }

  ngOnInit() {
    this.userManagementService.listUsers(this.initialPage).subscribe(
      x => {
        this.users = x.Data;
        this.pageInfo = x.PageInfo;
        this.setPage(this.initialPage);
      },
      error => {
        this.alertService.error(error);
        this.alertService.timeoutClear();
      }
    )
  }

  getTotalPages() {
    let usersOnLastPage = this.apiUsersPerPage;
    this.userManagementService.listUsers(this.pageInfo.TotalPages).subscribe(
      x => {
        usersOnLastPage = x.Data.length;
      },
      error => {
        this.alertService.error(error);
        this.alertService.timeoutClear();
      }
    )  
    return this.apiUsersPerPage*(this.pageInfo.TotalPages - 1) + Math.ceil(usersOnLastPage/this.usersPerPage);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    if (this.usersPerPage * page > this.users.length && this.lastApiPage < this.pageInfo.TotalPages) {

      this.lastApiPage = Math.ceil(this.usersPerPage * page / this.apiUsersPerPage);

      this.userManagementService.listUsers(this.lastApiPage).subscribe(
        x => {
          this.users = this.users.concat(x.Data);
          this.pageInfo = x.PageInfo;
        },
        error => {
          this.alertService.error(error);
          this.alertService.timeoutClear();
        }
      )
    }

    let totalPages = this.users.length % this.apiUsersPerPage != 0
      ? Math.ceil(this.users.length / this.usersPerPage)
      : Math.ceil(this.apiUsersPerPage * this.pageInfo.TotalPages / this.usersPerPage);


    // get pager object from service
    this.pager = this.paginationService.getPager(totalPages, page, this.usersPerPage);
  }

  updateUser(userId: number) {
    this.router.navigate(['users/create', this.pager.currentPage, userId]);
  }

  deleteUser(userId: number) {
    this.userManagementService.deleteUser(userId).subscribe(
      () => {
        const userToDelete = this.users.find(x => x.UserId == userId);
        if (userToDelete) {
          const index = this.users.indexOf(userToDelete);
          this.users.splice(index, 1);
        }
        this.router.navigate(['users']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.timeoutClear();
      }
    );
  }
}
