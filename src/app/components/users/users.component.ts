import { AlertService } from './../../services/alert.service';
import { UserManagementService } from './../../services/usermanagement.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo, ExtendedPageInfo } from 'src/app/models/common.model';
import { PaginationService } from 'src/app/services/pagination.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'userscomponent',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: UserModel[] = [];
  public pageInfo: ExtendedPageInfo;
  public lastApiPage = 1;
  pager: any = {};

  constructor(
    private userManagementService: UserManagementService,
    private paginationService: PaginationService,
    private alertService: AlertService,
    private router: Router
  ) { this.pageInfo = new ExtendedPageInfo() }

  ngOnInit() {
    this.userManagementService.listUsers().subscribe(
      firstPage => {
        this.users = firstPage.Data;
        this.pageInfo.ApiPageInfo = firstPage.PageInfo;

        this.userManagementService.listUsers(firstPage.PageInfo.TotalPages).subscribe(
          lastPage => {
            this.pageInfo.ApiLastPageSize = lastPage.Data.length;
            this.setPage();
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
  }

  setPage(page: number = 1) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    if (this.pageInfo.PageSize * page > this.users.length && this.lastApiPage < this.pageInfo.ApiPageInfo.TotalPages) {

      this.lastApiPage = Math.ceil(this.pageInfo.PageSize * page / this.pageInfo.ApiPageSize);

      this.userManagementService.listUsers(this.lastApiPage).subscribe(
        x => {
          this.users = this.users.concat(x.Data);
          this.pageInfo.ApiPageInfo = x.PageInfo;
        },
        error => {
          this.alertService.error(error);
          this.alertService.timeoutClear();
        }
      )
    }

    let currentTotalPages = Math.ceil((this.pageInfo.ApiPageSize * (this.pageInfo.ApiPageInfo.TotalPages - 1) + this.pageInfo.ApiLastPageSize) / this.pageInfo.PageSize);
    // get pager object from service
    this.pager = this.paginationService.getPager(currentTotalPages, page, this.pageInfo.PageSize);
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
