import { UserManagementService } from './../../services/usermanagement.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.scss']
})
export class UserCreateComponent implements OnInit {
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public Password: string;
  public IsAdmin: boolean;

  constructor(
    private router: Router,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
  }

  create() {
    this.userManagementService.createUser({
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Password: this.Password,
      Role: this.IsAdmin ? "Admin" : "User"
    }).subscribe(x => {
      this.router.navigate(['users']);
    })
  }
}
