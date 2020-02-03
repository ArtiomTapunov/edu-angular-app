import { AlertService } from './../../services/alert.service';
import { UserModel } from './../../models/user.model';
import { UserManagementService } from './../../services/usermanagement.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  public UserId: string;

  constructor(
    private router: Router,
    private userManagementService: UserManagementService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.UserId = this.activatedRoute.snapshot.paramMap.get('id');
    const pageNumber = this.activatedRoute.snapshot.paramMap.get('page');

    if (this.UserId)
    {
      this.userManagementService.listUsers(parseInt(pageNumber)).subscribe(
        x => {
          let currentUser: UserModel = x.Data.find(user => user.UserId.toString() === this.UserId)

          if (currentUser) {
            this.FirstName = currentUser.FirstName;
            this.LastName = currentUser.LastName;
            this.Email = currentUser.Email;
            this.IsAdmin = currentUser.Role == "Admin" ? true : false;
          }
          else {
            this.alertService.error(`The user #${this.UserId} doesn't exist on the ${pageNumber} page.`, true);
            this.alertService.timeoutClear();
            this.router.navigate(['users']);
          }
        },
        error => {
          this.alertService.error(error);
          this.alertService.timeoutClear();
        }
      )
    }
  }

  create() {
    this.userManagementService.createUser({
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Password: this.Password,
      Role: this.IsAdmin ? "Admin" : "User"
    }).subscribe(
      x => {
        this.router.navigate(['users']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.timeoutClear();
      }
    )
  }
}
