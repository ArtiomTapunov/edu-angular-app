import { AlertService } from './../../services/alert.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../../shared/form-styles.scss']
})
export class SignUpComponent implements OnInit {

  public user: UserModel;
  public registerForm: FormGroup;
  public submitted = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  get field() { return this.registerForm.controls }

  signUp() {
    this.submitted = true;
    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register({
      UserId: null,
      FirstName: this.registerForm.controls.firstName.value,
      LastName: this.registerForm.controls.lastName.value,
      Email: this.registerForm.controls.email.value,
      Password: this.registerForm.controls.password.value,
      PasswordConfirmation: this.registerForm.controls.confirmPassword.value,
      Role: "User"
    }).subscribe(
      user => {
        this.user = user;

        this.alertService.success(`Registration has been completed successfully.`, true);
        this.alertService.timeoutClear();
        this.router.navigate(["login"]);
      },
      (error: string) => {
        this.alertService.error(error);
        this.alertService.timeoutClear();
      }
    )
  }

}
