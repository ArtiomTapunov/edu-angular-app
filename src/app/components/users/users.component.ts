import { AlertService } from './../../services/alert.service';
import { UserManagementService } from './../../services/usermanagement.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public currentTotalPages : number;
  pager: any = {};

  constructor(
    private userManagementService: UserManagementService,
    private paginationService: PaginationService,
    private alertService: AlertService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { this.pageInfo = new PageInfo() }

  ngOnInit() {
    this.activateRoute.data.subscribe(data => {
      this.users = data.UsersData.Users;
      this.pageInfo = data.UsersData.PageInfo;
      this.currentTotalPages = this.apiUsersPerPage*(data.PageInfo.TotalPages - 1) + Math.ceil(data.UsersData.UsersOnLastPage/this.usersPerPage);    
      console.log(data.UsersData.Users);
    })

    if (this.users != undefined && this.pageInfo != undefined)
      this.setPage(this.initialPage);
  }
  
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    console.log(this.currentTotalPages);

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

    // get pager object from service
    this.pager = this.paginationService.getPager(this.currentTotalPages, page, this.usersPerPage);
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
