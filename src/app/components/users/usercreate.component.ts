import { AlertService } from './../../services/alert.service';
import { UserModel } from './../../models/user.model';
import { UserManagementService } from './../../services/usermanagement.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.scss']
})
export class UserCreateComponent implements OnInit {

  public IsAdmin: boolean;
  public UserId: string;
  public userForm: FormGroup;
  public submitted = false;

  constructor(
    private router: Router,
    private userManagementService: UserManagementService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: ['']
    });

    this.UserId = this.activatedRoute.snapshot.paramMap.get('id');
    const pageNumber = this.activatedRoute.snapshot.paramMap.get('page');

    if (this.UserId)
    {
      this.userManagementService.listUsers(parseInt(pageNumber)).subscribe(
        x => {
          let currentUser: UserModel = x.Data.find(user => user.UserId.toString() === this.UserId)

          if (currentUser) {
            this.userForm.patchValue ({
              userId: this.UserId,
              firstName: currentUser.FirstName,
              lastName: currentUser.LastName,
              email: currentUser.Email,       
              isAdmin: currentUser.Role == "Admin" ? true : false       
            })
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

  get field() { return this.userForm.controls }

  create() {
    this.submitted = true;
    this.alertService.clear();

    if (this.userForm.invalid) {
      return;
    }

    this.userManagementService.createUser({
      UserId: this.userForm.controls.userId.value,
      FirstName: this.userForm.controls.firstName.value,
      LastName: this.userForm.controls.lastName.value,
      Email: this.userForm.controls.email.value,
      Password: this.userForm.controls.password.value,
      Role: this.userForm.controls.isAdmin.value ? "Admin" : "User"
    }).subscribe(
      x => {
        this.alertService.success(`The user #${this.UserId} has been updated/created successfully.`, true);
        this.alertService.timeoutClear();
        this.router.navigate(['users']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.timeoutClear();
      }
    )
  }
}
