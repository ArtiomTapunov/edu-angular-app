import { UserModel } from './../../models/user.model';
import { UserManagementService } from './../../services/usermanagement.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'userscomponent',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: UserModel[] = [];

  constructor(
    private userManagementService: UserManagementService,
    private router: Router) {
      
   }

   ngOnInit() {
    this.userManagementService.listUsers(1).subscribe(x => {
      this.users = x.Data;
    })
   }
}
