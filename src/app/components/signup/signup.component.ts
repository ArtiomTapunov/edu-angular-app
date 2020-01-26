import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserExtendedModel } from 'src/app/models/userextended.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../../share/form-styles.scss']
})
export class SignUpComponent implements OnInit {
  public isLoading: boolean = false;
  public registerUserModel: UserExtendedModel;
  public user: UserModel;
  public errorMessage: string;
  public isError: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerUserModel = {};
    this.isError = false;
  }

  signUp() {
    this.authService.register(this.registerUserModel).subscribe(
      x => {
      this.user = x.Data;

      //Processing user logic can be added here
      //console.log(this.user);

      this.router.navigate(["login"]);
      },
      (error: any) => {
        if(error)
        {
          this.isError = true;
          this.errorMessage = error;
        }
      }
    )
  }

}
