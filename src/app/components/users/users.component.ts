import { UserModel } from './../../models/user.model';
import { UserManagementService } from './../../services/usermanagement.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo } from 'src/app/models/common.model';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'userscomponent',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: UserModel[] = [];
  public pageInfo: PageInfo;
  public initialPage = 1;
  pager: any = {};

  constructor(
    private userManagementService: UserManagementService,
    private paginationService: PaginationService,
    private router: Router
  ) { this.pageInfo = new PageInfo() }

  ngOnInit() {
   this.userManagementService.listUsers(this.initialPage).subscribe(x => {
     this.users = x.Data;
     this.pageInfo = x.PageInfo;
     this.setPage(1);
   })
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.userManagementService.listUsers(page).subscribe(x => {
      this.users = x.Data;
      this.pageInfo = x.PageInfo;
    })

    // get pager object from service
    this.pager = this.paginationService.getPager(this.pageInfo.TotalPages, this.pageInfo.Pages, page, 30);
}
}
